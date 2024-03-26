import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllParams {
  @IsInt()
  @Type(() => Number)
  pageSize: number;

  @IsInt()
  @Type(() => Number)
  offset: number;
}
