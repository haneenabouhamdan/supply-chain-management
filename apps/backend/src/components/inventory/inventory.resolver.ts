import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  // Query to fetch all inventory records
  @Query(() => [Inventory], { name: 'inventories' })
  async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  // Query to fetch a single inventory record by ID
  @Query(() => Inventory, { name: 'inventory' })
  async findOne(@Args('id') id: UUID): Promise<Inventory> {
    return this.inventoryService.findOne(id);
  }

  // Mutation to create a new inventory record
  @Mutation(() => Inventory)
  async createInventory(
    @Args('createInventoryInput') createInventoryInput: CreateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.create(createInventoryInput);
  }

  // Mutation to update an inventory record by ID
  @Mutation(() => Inventory)
  async updateInventory(
    @Args('id') id: UUID,
    @Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.update(id, updateInventoryInput);
  }

  // Mutation to remove an inventory record by ID
  @Mutation(() => Boolean)
  async removeInventory(@Args('id') id: UUID): Promise<boolean> {
    return this.inventoryService.remove(id);
  }
}
