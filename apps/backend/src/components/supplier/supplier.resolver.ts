import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { SupplierDto } from './dto';

@Resolver(() => SupplierDto)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => SupplierDto)
  createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    return this.supplierService.create(createSupplierInput);
  }

  @Query(() => [SupplierDto], { name: 'suppliers' })
  findAll() {
    return this.supplierService.findAll();
  }

  @Query(() => SupplierDto, { name: 'supplier' })
  findOne(@Args('id') id: UUID) {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => SupplierDto)
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ) {
    return this.supplierService.update(
      updateSupplierInput.id,
      updateSupplierInput,
    );
  }

  @Mutation(() => SupplierDto)
  removeSupplier(@Args('id') id: UUID) {
    return this.supplierService.remove(id);
  }
}
