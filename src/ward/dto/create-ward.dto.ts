import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWardDto {
  @IsNumber()
  no: number;

  @IsNotEmpty()
  name: string;
}
