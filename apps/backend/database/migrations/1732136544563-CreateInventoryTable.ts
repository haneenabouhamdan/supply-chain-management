import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { inventoryColumns } from '../columns';

export class CreateInventoryTable1732136544563 implements MigrationInterface {
  tableName = TableNames.inventory;
  private table = defaultTableConfig(this.tableName, inventoryColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);

    // Add foreign key for product_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: TableNames.products,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Add foreign key for supplier_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['supplier_id'],
        referencedTableName: TableNames.suppliers,
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    // Drop foreign key for product_id
    const productForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('product_id'),
    );
    if (productForeignKey)
      await queryRunner.dropForeignKey(this.tableName, productForeignKey);

    // Drop foreign key for supplier_id
    const supplierForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('supplier_id'),
    );
    if (supplierForeignKey)
      await queryRunner.dropForeignKey(this.tableName, supplierForeignKey);

    // Drop the Inventory table
    await queryRunner.dropTable(this.tableName, true);
  }
}
