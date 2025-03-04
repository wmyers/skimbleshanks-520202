import { Injectable } from '@nestjs/common';
import { Cat } from '../shared/schemas/cat.schema';
import { DeliveryMessage } from '../shared/schemas/comms.schema';
import { UserService } from '../user/user.service';
import { PouchService } from '../pouch/pouch.service';
import { UUID } from 'crypto';
import { UserNotFoundException } from '../shared/exceptions/user.notfound.exception';

@Injectable()
export class CommsService {
  constructor(
    private readonly userService: UserService,
    private readonly pouchService: PouchService,
  ) {}

  formatCatNames(cats: Cat[]): string {
    const formattedCatNames = cats.reduce((message, { name }, index) => {
      let prefix: string = '';
      if (index === 0) {
        prefix = '';
      } else if (index > 0 && index < cats.length - 1) {
        prefix = ', ';
      } else if (index === cats.length - 1) {
        prefix = ' and ';
      }
      return message.concat(`${prefix}${name}`);
    }, '');
    return formattedCatNames;
  }

  async generateNextDeliveryMessage(userId: UUID): Promise<DeliveryMessage> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }
    const activeCats = user.cats.filter(
      ({ subscriptionActive }) => subscriptionActive === true,
    );
    const formattedActiveCatNames = this.formatCatNames(activeCats);
    const title = `Your next delivery for ${formattedActiveCatNames}`;
    const message = `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedActiveCatNames}'s fresh food.`;
    const totalPrice = this.pouchService.aggregateCatsPouchPrice(activeCats);
    const freeGift = totalPrice > 120; // normally this threshold would be configured and retrieved separately
    return {
      title,
      message,
      totalPrice,
      freeGift,
    };
  }
}
