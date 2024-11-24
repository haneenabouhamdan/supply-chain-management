import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // Query to fetch all products
  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Query to fetch a single product by ID
  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id') id: UUID): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Mutation to create a new product
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  // Mutation to update an existing product
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: UUID,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, updateProductInput);
  }

  // Mutation to remove a product
  @Mutation(() => Boolean)
  async removeProduct(@Args('id') id: UUID): Promise<boolean> {
    return this.productService.remove(id);
  }
}
