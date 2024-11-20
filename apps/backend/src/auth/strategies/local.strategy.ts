import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AuthUserDto } from '../../common/dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'variables[signInInput][identifier]',
      passwordField: 'variables[signInInput][password]',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    identifier: string,
    password: string,
  ): Promise<AuthUserDto> {
    const { user } = await this.authService.signIn(identifier, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
