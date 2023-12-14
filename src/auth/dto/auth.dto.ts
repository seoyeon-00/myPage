import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @Length(4, 20)
  email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
