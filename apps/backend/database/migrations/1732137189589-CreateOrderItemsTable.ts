import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { orderItemColumns } from '../columns';

export class CreateOrderItemsTable1732137189589 implements MigrationInterface {
  tableName = TableNames.orderItems;
  private table = defaultTableConfig(this.tableName, orderItemColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Order Items table
    await queryRunner.createTable(this.table, true);

    // Add foreign key for order_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['order_id'], // Column in Order Items table
        referencedTableName: TableNames.orders, // Reference Orders table
        referencedColumnNames: ['id'], // Column in Orders table
        onDelete: 'CASCADE', // Delete order items when the order is deleted
        onUpdate: 'CASCADE',
      }),
    );

    // Add foreign key for product_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['product_id'], // Column in Order Items table
        referencedTableName: TableNames.products, // Reference Products table
        referencedColumnNames: ['id'], // Column in Products table
        onDelete: 'RESTRICT', // Prevent deletion of products if associated with an order item
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    // Drop foreign key for order_id
    const orderForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('order_id'),
    );
    if (orderForeignKey)
      await queryRunner.dropForeignKey(this.tableName, orderForeignKey);

    // Drop foreign key for product_id
    const productForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('product_id'),
    );
    if (productForeignKey)
      await queryRunner.dropForeignKey(this.tableName, productForeignKey);

    // Drop the Order Items table
    await queryRunner.dropTable(this.tableName, true);
  }
}
