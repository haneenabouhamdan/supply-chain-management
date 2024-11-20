import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { userColumns } from '../columns';
import { defaultTableConfig } from '../config';

export class CreateUsersTable1732050632630 implements MigrationInterface {
  tableName = TableNames.users;

  private table = defaultTableConfig(this.tableName, userColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Users table
    await queryRunner.createTable(this.table, true);

    // Add a foreign key to the suppliers table for supplier_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['supplier_id'], // Column in Users table
        referencedTableName: TableNames.suppliers, // Target table
        referencedColumnNames: ['id'], // Target column
        onDelete: 'SET NULL', // Action on supplier deletion
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key first
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('supplier_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey(this.tableName, foreignKey);
    }

    // Drop the Users table
    await queryRunner.dropTable(this.tableName, true);
  }
}
