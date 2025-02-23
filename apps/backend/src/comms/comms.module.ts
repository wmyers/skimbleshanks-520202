import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { PouchModule } from '../pouch/pouch.module';
import { UserModule } from '../user/user.module';
import { loggerMiddleware } from 'src/shared/middleware/logger.middleware';

@Module({
  controllers: [CommsController],
  providers: [CommsService],
  imports: [PouchModule, UserModule],
})
export class CommsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes({ path: 'comms/*', method: RequestMethod.GET });
  }
}