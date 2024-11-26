import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { AppGateway } from '../gateway/App.gateway';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly gateway: AppGateway,
  ) {}

  // Create a new product
  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductInput,
      inventoryId: '23154594-6ba0-430e-bbce-507ae76e21b1',
    });
    return await this.productRepository.save(product);
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Get a single product by ID
  async findOne(id: UUID): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Update a product by ID
  async update(
    id: UUID,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.findOne(id);

    this.productRepository.merge(product, updateProductInput);

    await this.gateway.broadcastInventoryUpdate();
    return await this.productRepository.save(product);
  }

  // Remove a product by ID
  async remove(id: UUID): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    const result = await this.productRepository.delete(id);
    return result.affected === 1;
  }

  async findByInventoryId(inventoryId: UUID): Promise<Product[]> {
    const products = await this.productRepository.findBy({
      inventoryId,
    });

    return products;
  }

  async adjustStock(
    productId: UUID,
    adjustmentQuantity: number,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!product) throw new NotFoundException('Product not found');

    if (adjustmentQuantity == 0)
      throw new BadRequestException('Quatity can not be 0');

    return this.update(product.id, {
      ...product,
      quantity: adjustmentQuantity,
    });
  }
}
