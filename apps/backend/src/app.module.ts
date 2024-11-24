// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
    UserModule,
    SupplierModule,
    CustomerModule,
    ProductModule,
    InventoryModule,
    OrderModule,
    OrderItemsModule,
    ShipmentModule,
  ],
})
export class AppModule {}
