import * as Crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  from(value: string) {
    return value;
  }
  to(value: string) {
    if (value) {
      return Crypto.createHmac('sha512', value).digest('hex');
    } else {
      return '';
    }
  }
  
}