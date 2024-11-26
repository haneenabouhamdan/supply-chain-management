import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto';

@Resolver(() => ProductDto)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // Query to fetch all products
  @Query(() => [ProductDto], { name: 'products' })
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  // Query to fetch a single product by ID
  @Query(() => ProductDto, { name: 'product' })
  async findOne(@Args('id') id: UUID): Promise<ProductDto> {
    return this.productService.findOne(id);
  }

  // Mutation to create a new product
  @Mutation(() => ProductDto)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<ProductDto> {
    return this.productService.create(createProductInput);
  }

  // Mutation to update an existing product
  @Mutation(() => ProductDto)
  async updateProduct(
    @Args('id') id: UUID,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<ProductDto> {
    return this.productService.update(id, updateProductInput);
  }

  // Mutation to remove a product
  @Mutation(() => Boolean)
  async removeProduct(@Args('id') id: UUID): Promise<boolean> {
    return this.productService.remove(id);
  }

  @Mutation(() => ProductDto, { name: 'adjustStock' })
  async adjustStock(
    @Args('productId') productId: UUID,
    @Args('adjustmentQuantity', { type: () => Number })
    adjustmentQuantity: number,
  ): Promise<ProductDto> {
    // Fetch product
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update stock
    return this.productService.update(product.id, {
      ...product,
      quantity: adjustmentQuantity,
    });
  }
}
