import { ValueTransformer } from 'typeorm';

export class UsernameTransformer implements ValueTransformer {
  from(value: string) {
    return value;
  }

  to(value: string) {
    if(value) {
      return value.replace(/[\W_]/gi,'').toLowerCase();
    } else {
      return value;
    }
  }
}