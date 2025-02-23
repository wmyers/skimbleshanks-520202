import { Test, TestingModule } from '@nestjs/testing';
import { PouchService } from './pouch.service';
import { Cat } from 'src/shared/schemas/cat.schema';

describe('PouchService', () => {
  let moduleFixture: TestingModule;
  let pouchService: PouchService;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      providers: [PouchService],
    }).compile();

    pouchService = moduleFixture.get<PouchService>(PouchService);
  });

  describe('aggregateCatsPouchPrice', () => {
    it('should aggregate cat pouch price data and return the total to two decimal places', () => {
      const cats: Cat[] = [
        {
          name: 'Mabel',
          subscriptionActive: true,
          breed: 'Tabby',
          pouchSize: 'F',
        },
        {
          name: 'Fluffy',
          subscriptionActive: true,
          breed: 'Somali',
          pouchSize: 'F',
        },
        {
          name: 'Tiddles',
          subscriptionActive: true,
          breed: 'Somali',
          pouchSize: 'F',
        },
      ];

      jest
        .spyOn(pouchService, 'getPouchPriceGBP')
        .mockImplementation(() => 71.25);
      expect(pouchService.aggregateCatsPouchPrice(cats)).toBe(213.75);
    });
  });
});
