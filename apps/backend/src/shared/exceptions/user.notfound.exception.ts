import { NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';

export class UserNotFoundException extends NotFoundException {
  constructor(userId: UUID) {
    super(
      `User ${userId} is not found.`,
      'Not Found',
    );
  }
}
