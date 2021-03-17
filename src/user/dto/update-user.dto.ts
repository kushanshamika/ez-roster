import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { UserRoles } from '../user-roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @IsOptional()
  @Matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, { message: 'invalid nic number' })
  identification: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsOptional()
  @IsNotEmpty()
  avatar: string;

  @IsOptional()
  @IsNotEmpty()
  fcmToken: string;

  @IsOptional()
  @IsNumber()
  ward: number;

  @IsOptional()
  @IsEmail()
  username: string;
}
