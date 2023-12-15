import { Controller, Get, Param } from '@nestjs/common';
import { RangeService } from './range.service';

@Controller('range')
export class RangeController {
  constructor(private readonly rangeService: RangeService) {}

  @Get(':num')
  getRange(@Param('num') num: string): object {
    if (num === '0') {
      return { result: '0' };
    }
    const result = this.rangeService.getRange(num);
    return { result };
  }
}
