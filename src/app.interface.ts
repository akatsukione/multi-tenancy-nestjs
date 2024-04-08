export interface IService<T, C, U> {
  get: (uuid: string, tenantId?: string) => T;
  create: (data: C, tenantId?: string) => void;
  update: (uuid: string, data: U, tenantId?: string) => void;
  delete: (uuid: string, tenantId?: string) => void;
  getAll: (tenantId?: string) => T[];
}
