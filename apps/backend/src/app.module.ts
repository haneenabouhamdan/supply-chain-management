// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { Product } from './models/product.entity'; // Import your entities here
// import { ProductModule } from './controllers/product.module'; // Import your modules here

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [], // Add your entities here
      synchronize: true, // Set to false in production
    }),
    // ProductModule, // Add your modules here
  ],
})
export class AppModule {}
