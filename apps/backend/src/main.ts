import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { logger } from './common/middlewares';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { middleware as expressCtx } from 'express-ctx';
// import { RolesPermissionsService } from './components/user/services';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: {
        origin: '*',
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  // const rolesPermissionsService = app.get(RolesPermissionsService);
  // await rolesPermissionsService.createDefaultRolesPermissions();

  app.use(expressCtx);

  app.useBodyParser('json', { limit: '50mb' });

  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });

  app.use(logger);

  await app.listen(3000);

  console.info(`🚀🚀🚀 app started 🚀🚀🚀`);
}
bootstrap();
