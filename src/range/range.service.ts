import { Injectable } from '@nestjs/common';

@Injectable()
export class RangeService {
  getRange(num: string): string[] | string {
    const numInt = parseInt(num);
    if (numInt < 0) {
      return 'Error';
    }
    if (numInt === 0) {
      return '0';
    }
    const result = [];
    for (let i = 1; i <= numInt; i++) {
      result.push(i.toString());
    }
    return result;
  }
}
