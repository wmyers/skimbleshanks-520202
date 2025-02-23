import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { UserService } from '../user/user.service';
import { PouchService } from '../pouch/pouch.service';
import { User } from '../shared/schemas/user.schema';
import { DeliveryMessage } from '../shared/schemas/comms.schema';
import { UUID } from 'crypto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserNotFoundException } from '../shared/exceptions/user.notfound.exception';
import { INestApplication } from '@nestjs/common';

describe('CommsController', () => {
  let commsController: CommsController;
  // let commsService: CommsService;
  let userService: UserService;
  let pouchService: PouchService;
  let moduleFixture: TestingModule;
  let cache: Cache;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [
        CommsService,
        UserService,
        PouchService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => [], // need to test for an array of users
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    // commsService = moduleFixture.get<CommsService>(CommsService);
    commsController = moduleFixture.get<CommsController>(CommsController);
    userService = moduleFixture.get<UserService>(UserService);
    pouchService = moduleFixture.get<PouchService>(PouchService);
    cache = moduleFixture.get(CACHE_MANAGER);
  });

  describe('getYourNextDelivery', () => {
    const testUser: User = {
      id: 'abcd1234-1234-5678-9900-abcd12345678',
      firstName: 'Test',
      lastName: 'User',
      email: 'Test_User@hotmail.com',
      cats: [
        {
          name: 'Mabel',
          subscriptionActive: true,
          breed: 'Tabby',
          pouchSize: 'C',
        },
        {
          name: 'Fluffy',
          subscriptionActive: true,
          breed: 'Somali',
          pouchSize: 'F',
        },
      ],
    };
    const successfulResponse: DeliveryMessage = {
      title: 'Your next delivery for Mabel and Fluffy',
      message:
        "Hey Test! In two days' time, we'll be charging you for your next order for Mabel and Fluffy's fresh food.",
      totalPrice: 134,
      freeGift: true,
    };

    it('should return data successfully with the user data interpolated', () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => testUser);
      expect(
        commsController.getYourNextDelivery(testUser.id as UUID),
      ).resolves.toEqual(successfulResponse);
    });

    it('should throw an User Not Found exception if the user is not found', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => undefined);
      await expect(
        commsController.getYourNextDelivery(testUser.id as UUID),
      ).rejects.toThrow(UserNotFoundException);
    });

    it('should fail validation if userId is not a uuid', async () => {
      const app: INestApplication = moduleFixture.createNestApplication();
      await app.init();
      const response = await request(app.getHttpServer()).get(
        '/comms/your-next-delivery/1234',
      );
      expect(response.status).toBe(406);
      expect(response.body.exception.message).toEqual(
        'Validation failed (uuid is expected)',
      );
      app.close();
    });

    it(`should get the user from the cache`, async () => {
      const spy = jest.spyOn(cache, 'get');
      try {
        await commsController.getYourNextDelivery(testUser.id as UUID);
      } catch (e) {}
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should set freeGift to false if the total price is not above the threshold of £120.00', async () => {
      const successfulResponseWithoutFreeGift: DeliveryMessage = {
        title: successfulResponse.title,
        message: successfulResponse.message,
        totalPrice: 50,
        freeGift: false,
      };
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => testUser);
      jest
        .spyOn(pouchService, 'aggregateCatsPouchPrice')
        .mockImplementation(() => 50);
      expect(
        commsController.getYourNextDelivery(testUser.id as UUID),
      ).resolves.toEqual(successfulResponseWithoutFreeGift);
    });

    it('should ignore cats who are not actively subscribed', async () => {
      const testUserInactiveSubscriptionCat: User = {
        ...testUser,
        cats: [
          {
            name: 'Mabel',
            subscriptionActive: true,
            breed: 'Tabby',
            pouchSize: 'C',
          },
          {
            name: 'Fluffy',
            subscriptionActive: false,
            breed: 'Somali',
            pouchSize: 'F',
          },
        ],
      };
      const successfulResponseOnlyActivelySubscribedCats: DeliveryMessage = {
        title: 'Your next delivery for Mabel',
        message:
          "Hey Test! In two days' time, we'll be charging you for your next order for Mabel's fresh food.",
        totalPrice: 62.75,
        freeGift: false,
      };
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => testUserInactiveSubscriptionCat);
      expect(
        commsController.getYourNextDelivery(testUser.id as UUID),
      ).resolves.toEqual(successfulResponseOnlyActivelySubscribedCats);
    });
  });
});
