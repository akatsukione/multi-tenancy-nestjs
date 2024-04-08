import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateTodoDto } from '../dtos/CreateTodoDto';
import { UpdateTodoDto } from '../dtos/UpdateTodoDto';
import { TodoService } from '../services/TodoService';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/todos')
  getTodos(@Req() req: Request) {
    return this.todoService.getAll(req['tenantId']);
  }

  @Post('/todos')
  createTodo(@Req() req: Request, @Body() data: CreateTodoDto) {
    this.todoService.create(data, req['tenantId']);
    return HttpStatus.CREATED;
  }

  @Get('/todos/:uuid')
  getTodo(@Req() req: Request, @Param('uuid') uuid: string) {
    return this.todoService.get(uuid, req['tenantId']);
  }

  @Put('/todos/:uuid')
  updateTodo(
    @Req() req: Request,
    @Param('uuid') uuid: string,
    @Body() data: UpdateTodoDto,
  ) {
    this.todoService.update(uuid, data, req['tenantId']);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/todos/:uuid')
  deleteTodo(@Req() req: Request, @Param('uuid') uuid: string) {
    this.todoService.delete(uuid, req['tenantId']);
    return HttpStatus.ACCEPTED;
  }
}
