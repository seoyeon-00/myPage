import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContactEntity } from './entities/contact.entitiy';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async create(contactDto: ContactDto) {
    const contactEntity = await this.contactRepository.create(contactDto);
    return await this.contactRepository.save(contactEntity);
  }

  async findAll() {
    return await this.contactRepository.find();
  }
}
