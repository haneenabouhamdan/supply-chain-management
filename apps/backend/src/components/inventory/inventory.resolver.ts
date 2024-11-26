import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { Product } from '../product/entities';
import { ProductService } from '../product/product.service';
import { Supplier, SupplierService } from '../supplier';
import { InventoryFilterArgs } from './dto/inventory.input';
import { ProductDto } from '../product/dto';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(
    private readonly inventoryService: InventoryService,
    private productService: ProductService,
    private supplierService: SupplierService,
  ) {}

  @Query(() => [Inventory], { name: 'inventories' })
  async getList(
    @Args('filters', { type: () => InventoryFilterArgs, nullable: true })
    filters?: InventoryFilterArgs,
  ): Promise<Inventory[]> {
    return this.inventoryService.findAll(filters || {});
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

  // ResolveField for fetching order items along with product details
  @ResolveField(() => [ProductDto], { name: 'products' })
  async getProducts(@Parent() inventory: Inventory): Promise<ProductDto[]> {
    // Fetch order items based on the order ID
    const products = await this.productService.findByInventoryId(
      inventory.id as UUID,
    );

    return products;
  }

  // ResolveField for fetching order items along with product details
  @ResolveField(() => Supplier, { name: 'supplier' })
  async getSupplier(@Parent() inventory: Inventory): Promise<Supplier> {
    // Fetch order items based on the order ID
    const supplier = await this.supplierService.findOne(
      inventory.supplierId as UUID,
    );

    return supplier;
  }
}
