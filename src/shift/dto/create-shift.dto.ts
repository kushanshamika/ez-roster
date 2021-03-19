import { IsEnum, IsNotEmpty } from 'class-validator';
import { ShiftTypes } from '../shift-types.enum';

export class CreateShiftDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(ShiftTypes)
  type: ShiftTypes;
}
