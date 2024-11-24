import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentService, ShipmentResolver],
})
export class ShipmentModule {}
