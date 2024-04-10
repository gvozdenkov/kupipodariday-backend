import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  compare(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }

  hash(password: string) {
    return bcrypt.hash(password, 10);
  }
}
