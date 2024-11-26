import { BaseFilter } from 'src/common/repositories';
import { SelectQueryBuilder } from 'typeorm';
import { Inventory } from '../entities';
import { InventoryFilterArgs } from '../dto/inventory.input';

export class InventoryFilter extends BaseFilter<
  Inventory,
  InventoryFilterArgs
> {
  // Define simple filters that map directly to columns in the Inventory entity
  protected simpleFilters: Array<keyof Inventory> = ['location', 'supplierId'];

  // Define sortable columns
  protected sortable: Array<keyof Inventory> = ['createdAt'];

  /**
   * Apply custom filters to the query
   */
  applyCustomFilters(
    filters: InventoryFilterArgs,
  ): SelectQueryBuilder<Inventory> {
    // Custom filter: low stock
    if (filters.tags) {
      this.query
        .innerJoin(`${this.alias}.tags`, 'tag')
        .andWhere('tag.name IN (:...tagNames)', { tagNames: filters.tags });
    }
    this.query.innerJoinAndSelect(`${this.alias}.products`, 'product');
    // Filter by category
    if (filters.category) {
      this.query.andWhere(`product.category = :category`, {
        category: filters.category,
      });
    }

    // Filter by lowStock
    if (filters.lowStock) {
      this.query.andWhere(`product.quantity < COALESCE(product.threshold, 0)`);
    }

    return this.query;
  }

  /**
   * Apply custom sorting
   */
  applyCustomSort(
    filters: InventoryFilterArgs,
  ): BaseFilter<Inventory, InventoryFilterArgs> {
    if (filters.sortBy && this.sortable.includes(filters.sortBy)) {
      const order = filters.sortOrder || 'ASC';
      this.query.addOrderBy(`${this.alias}.${filters.sortBy}`, order);
    }
    return this;
  }

  /**
   * Apply search functionality
   */
  applySearch(
    filters: InventoryFilterArgs,
  ): BaseFilter<Inventory, InventoryFilterArgs> {
    if (filters.keyword) {
      const keyword = `%${filters.keyword.toLowerCase()}%`;
      this.query.andWhere(`LOWER(${this.alias}.name) LIKE :keyword`, {
        keyword,
      });
    }
    return this;
  }
}
