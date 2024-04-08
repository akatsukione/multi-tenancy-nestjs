import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from '../../app.interface';
import { TenantModel } from '../models/TenantModel';
import { CreateTenantDto } from '../dtos/CreateTenantDto';
import { UpdateTenantDto } from '../dtos/UpdateTenantDto';

@Injectable()
export class TenantService
  implements IService<TenantModel, CreateTenantDto, UpdateTenantDto>
{
  private readonly tenants: TenantModel[] = []; // Temp local database..

  create(data: CreateTenantDto): void {
    const uuid = randomUUID();
    this.tenants.push(new TenantModel(uuid, data.name, data.subdomain));
  }

  delete(uuid: string): void {
    const index = this.tenants.findIndex((tenant) => tenant.id === uuid);
    if (index === -1) throw new NotFoundException('Tenant not found');
    this.tenants.splice(index, 1);
  }

  get(uuid: string): TenantModel {
    const todo = this.tenants.find((tenant) => tenant.id === uuid);
    if (!todo) throw new NotFoundException('Tenant not found');
    return todo;
  }

  update(uuid: string, data: UpdateTenantDto): void {
    const tenant = this.tenants.find((tenant) => tenant.id === uuid);
    if (!tenant) throw new NotFoundException('Tenant not found');
    tenant.name = data.name;
    tenant.subdomain = data.subdomain;
  }

  getAll(): TenantModel[] {
    return this.tenants;
  }
}
