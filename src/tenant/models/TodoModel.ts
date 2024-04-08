export class TodoModel {
  uuid: string;
  title: string;
  done: boolean;
  tenantId?: string;

  constructor(uuid: string, title: string, done: boolean) {
    this.uuid = uuid;
    this.title = title;
    this.done = done;
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }
}
