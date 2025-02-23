import { Injectable } from '@nestjs/common';
import { type PouchSize } from '../shared/schemas/pouch.schema';
import { type Cat } from '../shared/schemas/cat.schema';

// This data would normally be fetched dynamically.
// You could also have a Price Service/Module to
// retrieve this data based on different currencies.
const PouchPriceGBPLookup = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
} as const;

@Injectable()
export class PouchService {
  getPouchPriceGBP(size: PouchSize) {
    return PouchPriceGBPLookup[size] ?? 0;
  }

  aggregateCatsPouchPrice(cats: Cat[] = []): number {
    const price = cats.reduce((total, cat) => {
      return total + this.getPouchPriceGBP(cat.pouchSize);
    }, 0);
    return Math.round(price * 100) / 100;
  }
}
