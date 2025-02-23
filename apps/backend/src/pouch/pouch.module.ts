import { Module } from '@nestjs/common';
import { PouchService } from './pouch.service';

@Module({
  providers: [PouchService],
  exports: [PouchService],
})
export class PouchModule {}