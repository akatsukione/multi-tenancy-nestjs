import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NestMiddleware,
  Logger,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { TenantService } from '../services/TenantService';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    const tenantId = headers['X-TENANT-ID'] || headers['x-tenant-id'];

    if (!tenantId) {
      this.logger.warn('`X-TENANT-ID` not provided');
      req['tenantId'] = null;
      return next();
    }
    const tenant = this.tenantService.get(tenantId);
    req['tenantId'] = tenant.id;
    next();
  }
}
