import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  // Create a new supplier
  async create(createSupplierInput: CreateSupplierInput): Promise<Supplier> {
    const supplier = this.supplierRepository.create(createSupplierInput);
    return await this.supplierRepository.save(supplier);
  }

  // Get all suppliers
  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }

  // Get a single supplier by ID
  async findOne(id: UUID): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  // Update a supplier by ID
  async update(
    id: UUID,
    updateSupplierInput: UpdateSupplierInput,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id);
    this.supplierRepository.merge(supplier, updateSupplierInput);
    return await this.supplierRepository.save(supplier);
  }

  // Remove a supplier by ID
  async remove(id: UUID): Promise<boolean> {
    const supplier = await this.findOne(id);
    if (!supplier) throw new BadRequestException('Supplier not found');

    const result = await this.supplierRepository.delete(id);
    return result.affected === 1;
  }
}
