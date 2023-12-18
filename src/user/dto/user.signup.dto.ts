import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'duck99@gmail.com',
    description: 'email',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty({
    example: '12345678',
    description: 'password',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  @ApiProperty({
    example: '오리',
    description: 'nickname',
    required: true,
  })
  nickname: string;
}
