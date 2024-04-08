export class UpdateTodoDto {
  id: string;
  title: string;
  done: boolean;
  constructor(id: string, title: string, done: boolean) {
    this.title = title;
    this.done = done;
  }
}
