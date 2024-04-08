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
import { CreateTenantDto } from '../dtos/CreateTenantDto';
import { UpdateTenantDto } from '../dtos/UpdateTenantDto';
import { TenantService } from '../services/TenantService';

@Controller()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('/tenants')
  getAll() {
    return this.tenantService.getAll();
  }

  @Post('/tenants')
  createTodo(@Req() req: Request, @Body() data: CreateTenantDto) {
    this.tenantService.create(data);
    return HttpStatus.CREATED;
  }

  @Get('/tenants/:uuid')
  getTenant(@Req() req: Request, @Param('uuid') uuid: string) {
    return this.tenantService.get(uuid);
  }

  @Put('/tenants/:uuid')
  updateTenant(
    @Req() req: Request,
    @Param('uuid') uuid: string,
    @Body() data: UpdateTenantDto,
  ) {
    this.tenantService.update(uuid, data);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/tenants/:uuid')
  deleteTodo(@Req() req: Request, @Param('uuid') uuid: string) {
    this.tenantService.delete(uuid);
    return HttpStatus.ACCEPTED;
  }
}
