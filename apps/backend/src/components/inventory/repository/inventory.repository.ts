import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Inventory } from '../entities';
import { InventoryFilter } from '../filters/inventory.filter';
import { InventoryFilterArgs } from '../dto/inventory.input';

@Injectable()
export class InventoryRepository extends BaseRepository<
  Inventory,
  InventoryFilterArgs
> {
  constructor(
    private dataSource: DataSource,
    private inventoryFilter: InventoryFilter,
  ) {
    super(Inventory, dataSource);

    this.setFilter(inventoryFilter);
  }
}
