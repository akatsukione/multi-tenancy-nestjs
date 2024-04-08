export class CreateTenantDto {
  name: string;
  subdomain?: string;
  constructor(name: string, subdomain?: string) {
    this.name = name;
    this.subdomain = subdomain;
  }
}
