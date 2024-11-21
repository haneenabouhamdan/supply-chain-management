import { Global, InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfig } from '../common/types';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        const redisConfig = configService.get<RedisConfig>('redis');
        if (!redisConfig)
          throw new InternalServerErrorException(
            'Cannot find redis configuration',
          );
        const { host, port, prefix } = redisConfig;
        return {
          config: {
            host,
            password: '',
            port,
            keyPrefix: prefix,
          },
        };
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
