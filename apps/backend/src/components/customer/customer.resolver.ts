import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerDto } from './dto/customer.dto';

@Resolver(() => CustomerDto)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  // Query to fetch all customers
  @Query(() => [CustomerDto], { name: 'customers' })
  async findAll(): Promise<CustomerDto[]> {
    return this.customerService.findAll();
  }

  // Query to fetch a single customer by ID
  @Query(() => CustomerDto, { name: 'customer' })
  async findOne(@Args('id') id: UUID): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  // Mutation to create a new customer
  @Mutation(() => CustomerDto)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<CustomerDto> {
    return this.customerService.create(createCustomerInput);
  }

  // Mutation to update an existing customer
  @Mutation(() => CustomerDto)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<CustomerDto> {
    return this.customerService.update(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  // Mutation to remove a customer
  @Mutation(() => Boolean)
  async removeCustomer(@Args('id') id: UUID): Promise<boolean> {
    return this.customerService.remove(id);
  }
}
