import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  // Query to fetch all customers
  @Query(() => [Customer], { name: 'customers' })
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // Query to fetch a single customer by ID
  @Query(() => Customer, { name: 'customer' })
  async findOne(@Args('id') id: UUID): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  // Mutation to create a new customer
  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerInput);
  }

  // Mutation to update an existing customer
  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: UUID,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update(id, updateCustomerInput);
  }

  // Mutation to remove a customer
  @Mutation(() => Boolean)
  async removeCustomer(@Args('id') id: UUID): Promise<boolean> {
    return this.customerService.remove(id);
  }
}
