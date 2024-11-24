import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Query(() => [Shipment], { name: 'shipments' })
  async findAll(): Promise<Shipment[]> {
    return this.shipmentService.findAll();
  }

  @Query(() => Shipment, { name: 'shipment' })
  async findOne(@Args('id') id: UUID): Promise<Shipment> {
    return this.shipmentService.findOne(id);
  }

  @Mutation(() => Shipment)
  async createShipment(
    @Args('createShipmentInput') createShipmentInput: CreateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.create(createShipmentInput);
  }

  @Mutation(() => Shipment)
  async updateShipment(
    @Args('id') id: UUID,
    @Args('updateShipmentInput') updateShipmentInput: UpdateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.update(id, updateShipmentInput);
  }

  @Mutation(() => Boolean)
  async removeShipment(@Args('id') id: UUID): Promise<boolean> {
    return this.shipmentService.remove(id);
  }
}
