import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { orderColumns } from '../columns';

export class CreateOrdersTable1732136878072 implements MigrationInterface {
  tableName = TableNames.orders;
  private table = defaultTableConfig(this.tableName, orderColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Orders table
    await queryRunner.createTable(this.table, true);

    // Add foreign key for customer_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['customer_id'], // Column in Orders table
        referencedTableName: TableNames.customers, // Reference Customers table
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Add foreign key for supplier_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['supplier_id'], // Column in Orders table
        referencedTableName: TableNames.suppliers, // Reference Suppliers table
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Keep orders but remove supplier_id if the supplier is deleted
        onUpdate: 'CASCADE',
      }),
    );

    // Add foreign key for shipment_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['shipment_id'], // Column in Orders table
        referencedTableName: TableNames.shipments, // Reference Shipments table
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Keep orders but remove shipment_id if the shipment is deleted
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    // Drop foreign key for customer_id
    const customerForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('customer_id'),
    );
    if (customerForeignKey)
      await queryRunner.dropForeignKey(this.tableName, customerForeignKey);

    // Drop foreign key for supplier_id
    const supplierForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('supplier_id'),
    );
    if (supplierForeignKey)
      await queryRunner.dropForeignKey(this.tableName, supplierForeignKey);

    // Drop foreign key for shipment_id
    const shipmentForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('shipment_id'),
    );
    if (shipmentForeignKey)
      await queryRunner.dropForeignKey(this.tableName, shipmentForeignKey);

    // Drop the Orders table
    await queryRunner.dropTable(this.tableName, true);
  }
}
