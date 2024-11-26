import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { Shipment } from './entities/shipment.entity';
import { UserModule, UserService } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]), forwardRef(() => UserModule)],
  providers: [ShipmentService, ShipmentResolver, UserService],
})
export class ShipmentModule {}
