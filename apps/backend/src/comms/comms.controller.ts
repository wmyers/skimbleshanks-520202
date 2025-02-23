import {
  Controller,
  Get,
  Param,
  HttpStatus,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CommsService } from './comms.service';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { UUID } from 'crypto';

@Controller('comms')
@UseFilters(new HttpExceptionFilter())
export class CommsController {
  constructor(private commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  async getYourNextDelivery(
    @Param(
      'userId',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: UUID,
  ) {
    return await this.commsService.generateNextDeliveryMessage(userId);
  }
}