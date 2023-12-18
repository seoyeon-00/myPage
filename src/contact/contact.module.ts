import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactEntity } from './entities/contact.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactController],
  exports: [ContactService, TypeOrmModule],
  providers: [ContactService],
})
export class ContactModule {}
