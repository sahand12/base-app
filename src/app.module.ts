import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { PlgModule } from './modules/plg/plg.module';
import { logger, LoggerMiddleware } from './middlewares/logger.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, PlgModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
