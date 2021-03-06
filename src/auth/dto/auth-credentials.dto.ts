import { IsEmail, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  username: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'password too week' },
  )
  password: string;
}
