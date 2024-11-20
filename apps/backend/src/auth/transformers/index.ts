import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail, isPhoneNumber } from 'class-validator';
import { AuthIdentifierType } from '../types';

@Injectable()
export class AuthIdentifierTransformer<T extends AuthIdentifierType>
  implements PipeTransform
{
  async transform(input: T) {
    if (input.identifier?.includes('@')) {
      this.#verifyEmail(input.identifier);
    } else {
      this.#verifyPhone(input.identifier);
    }

    return input;
  }

  #verifyEmail(email: string) {
    if (!isEmail(email)) {
      throw new BadRequestException(`${email} not a valid email`);
    }
  }

  #verifyPhone(phone: string) {
    if (!isPhoneNumber(phone)) {
      throw new BadRequestException(`${phone} not a valid phone number`);
    }
  }
}
