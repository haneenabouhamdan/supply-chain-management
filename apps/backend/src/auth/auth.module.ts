import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
// import { jwtConstants } from './constant';
import { UserModule, UserRepository, UserService } from '../components/user';
import { JwtModule } from '@nestjs/jwt';
import { UserFilter } from '../components/user/filters';
import { LocalStrategy } from './strategies';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Config } from 'src/config';
import { TokenService } from 'src/components/user/services';

@Module({
  imports: [
    UserModule,
    UserFilter,
    JwtModule.register({
      global: true,
      secret: Config().jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
