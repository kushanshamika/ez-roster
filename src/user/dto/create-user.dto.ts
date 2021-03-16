import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { UserRoles } from '../user-roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @Matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, { message: 'invalid nic number' })
  identification: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsEmail()
  username: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'password too week' },
  )
  password: string;
}
