import { Injectable } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CONTACTS } from "./db";
import { Contact } from "@comp-store/data-model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactsService {
  contacts = CONTACTS;

  create(contact: Contact) {
    this.contacts = [
      ...this.contacts,
      Object.assign({}, contact, {id: uuidv4()})
    ];

    return this.contacts;
  }

  findAll() {
    return this.contacts;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
