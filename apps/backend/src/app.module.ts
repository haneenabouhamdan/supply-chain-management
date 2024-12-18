import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  CustomerModule,
  InventoryModule,
  OrderModule,
  ProductModule,
  SupplierModule,
  UserModule,
  OrderItemsModule,
  ShipmentModule,
} from './components';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { GatewayModule } from './components/gateway';
import { AppGateway } from './components/gateway/App.gateway';
import { InventoryService } from './components/inventory/inventory.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NAME,
      entities: [], // Add your entities here
      synchronize: true, // Disable in production
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    SupplierModule,
    CustomerModule,
    ProductModule,
    InventoryModule,
    OrderModule,
    OrderItemsModule,
    ShipmentModule,
    AuthModule,
    forwardRef(() => GatewayModule),
  ],
  providers: [AppService, JwtService],
})
export class AppModule {}
