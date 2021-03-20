import { IsEnum, IsOptional } from 'class-validator';
import { ShiftTypes } from '../shift-types.enum';

export class GetShiftFilterDto {
  @IsOptional()
  @IsEnum(ShiftTypes)
  type: ShiftTypes;
}
