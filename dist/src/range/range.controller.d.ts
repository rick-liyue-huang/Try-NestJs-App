import { RangeService } from './range.service';
export declare class RangeController {
    private readonly rangeService;
    constructor(rangeService: RangeService);
    getRange(num: string): object;
}
