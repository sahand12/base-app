import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlgController } from './plg.controller';
import { PlgService } from './plg.service';
import { RequestIdMiddleware } from '../../middlewares/request-id.middleware';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';

@Module({
  controllers: [PlgController],
  providers: [PlgService],
})
export class PlgModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestIdMiddleware, LoggerMiddleware);
  // }
}
