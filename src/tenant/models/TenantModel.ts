export class TenantModel {
  id: string;
  name: string;
  subdomain?: string; // https://store.mysassapp.com
  constructor(id: string, name: string, subdomain?: string) {
    this.id = id;
    this.name = name;
    this.subdomain = subdomain || 'https://mysassapp.com';
  }
}
