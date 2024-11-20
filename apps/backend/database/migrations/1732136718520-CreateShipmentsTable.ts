import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { shipmentColumns } from '../columns';

export class CreateShipmentsTable1732136718520 implements MigrationInterface {
  tableName = TableNames.shipments;
  private table = defaultTableConfig(this.tableName, shipmentColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Shipments table
    await queryRunner.createTable(this.table, true);

    // Add foreign key for driver_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['driver_id'], // Column in Shipments table
        referencedTableName: TableNames.users, // Reference Drivers table
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    // Drop foreign key for driver_id
    const driverForeignKey = table.foreignKeys.find((fk) =>
      fk.columnNames.includes('driver_id'),
    );
    if (driverForeignKey)
      await queryRunner.dropForeignKey(this.tableName, driverForeignKey);

    // Drop the Shipments table
    await queryRunner.dropTable(this.tableName, true);
  }
}
