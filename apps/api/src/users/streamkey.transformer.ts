import { ValueTransformer } from 'typeorm';

export class StreamKeyTransformer implements ValueTransformer {
  from(value: string) {
    return value;
  }
  to(value: string) {
    if (value) {
      return Math.random().toString(36).slice(2);
    } else {
      return '';
    }
  }
  
}