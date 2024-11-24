import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Create a new customer
  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerInput);
    return await this.customerRepository.save(customer);
  }

  // Get all customers
  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  // Get a single customer by ID
  async findOne(id: UUID): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // Update a customer by ID
  async update(
    id: UUID,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) throw new NotFoundException('Customer Not found');
    this.customerRepository.merge(customer, updateCustomerInput);
    return await this.customerRepository.save(customer);
  }

  // Remove a customer by ID
  async remove(id: UUID): Promise<boolean> {
    const customer = await this.findOne(id);
    if (!customer) throw new NotFoundException('Customer Not found');
    const result = await this.customerRepository.delete(id);
    return result.affected === 1;
  }
}
