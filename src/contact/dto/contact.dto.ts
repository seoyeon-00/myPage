import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  @ApiProperty({
    example: '오리',
    description: 'name',
    required: true,
  })
  name: string;

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
  @ApiProperty({
    example: '안녕하세요.',
    description: 'content',
    required: true,
  })
  content: string;
}
