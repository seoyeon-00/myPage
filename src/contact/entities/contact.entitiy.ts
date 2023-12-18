import {
  Column,
  CreateDateColumn,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'contact' })
export class ContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '오리',
    description: '사용자 이름',
    required: true,
  })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    example: 'hello@gmail.com',
    description: '사용자 이메일',
    required: true,
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '안녕하세요.',
    description: '문의 내용',
    required: true,
  })
  @Column({ length: 1000 })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
