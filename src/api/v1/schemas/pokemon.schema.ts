import { IsNumberString, IsNotEmpty } from 'class-validator';

export class FindAllParams {
  @IsNumberString()
  @IsNotEmpty()
  page: string;

  @IsNumberString()
  @IsNotEmpty()
  pageSize: string;
}
