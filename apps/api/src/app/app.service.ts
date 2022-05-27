import { Injectable } from '@nestjs/common';
import { CONTACTS } from "./db";

@Injectable()
export class AppService {
  contacts = CONTACTS
  getData() {
    return this.contacts;
  }
}
