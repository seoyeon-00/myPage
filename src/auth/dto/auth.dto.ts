import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @Length(4, 20)
  @ApiProperty({
    example: 'duck99@gmail.com',
    description: 'email',
    required: true,
  })
  email: string;

  @IsString()
  @Length(8, 20)
  @ApiProperty({
    example: '12345678',
    description: 'password',
    required: true,
  })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
