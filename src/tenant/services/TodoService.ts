import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from '../../app.interface';
import { TodoModel } from '../models/TodoModel';
import { CreateTodoDto } from '../dtos/CreateTodoDto';
import { UpdateTodoDto } from '../dtos/UpdateTodoDto';

@Injectable()
export class TodoService
  implements IService<TodoModel, CreateTodoDto, UpdateTodoDto>
{
  private readonly todos: TodoModel[] = []; // temp local databse to store all our todo items

  create(data: CreateTodoDto, tenantId?: string): void {
    const uuid = randomUUID();
    const newTodo = new TodoModel(uuid, data.title, data.done);
    if (tenantId) newTodo.setTenantId(tenantId);
    this.todos.push(newTodo);
  }

  delete(uuid: string, tenantId?: string) {
    const index = this.todos.findIndex((todo) => todo.uuid === uuid);
    if (index === -1) throw new NotFoundException('Todo not found');
    if (tenantId && this.todos[index].tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    this.todos.splice(index, 1);
  }

  get(uuid: string, tenantId?: string): TodoModel {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (!todo) throw new NotFoundException('Todo not found');
    if (tenantId && todo.tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    return todo;
  }

  update(uuid: string, data: UpdateTodoDto, tenantId?: string): TodoModel {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (!todo) throw new NotFoundException('Todo not found');
    if (tenantId && todo.tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    todo.title = data.title;
    todo.done = data.done;
    return todo;
  }

  getAll(tenantId?: string): TodoModel[] {
    if (tenantId)
      return this.todos.filter((todo) => todo.tenantId === tenantId);
    return this.todos.filter((todo) => !todo.tenantId);
  }
}
