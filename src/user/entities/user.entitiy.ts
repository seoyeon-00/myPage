import {
  Column,
  CreateDateColumn,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'hello@gmail.com',
    description: '사용자 이메일',
    required: true,
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'abcdefg12345',
    description: '사용자 비밀번호',
    required: true,
  })
  @Column({ length: 255 })
  password: string;

  @ApiProperty({
    example: '거북이',
    description: '사용자 닉네임',
    required: true,
  })
  @Column({ length: 255 })
  nickname: string;

  @CreateDateColumn()
  created_at: Date;
}
