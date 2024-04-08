import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TodoController } from './tenant/controllers/todo.controller';
import { TenantController } from './tenant/controllers/tenant.controller';
import { TodoService } from './tenant/services/TodoService';
import { TenantService } from './tenant/services/TenantService';
import { TenantMiddleware } from './tenant/middlewares/TenantMiddleware';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TodoController, TenantController],
  providers: [TodoService, TenantService, TenantMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('/todos');
  }
}
