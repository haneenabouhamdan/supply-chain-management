import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { customerColumns } from '../columns';

export class CreateCustomersTable1732136679192 implements MigrationInterface {
  tableName = TableNames.customers;
  private table = defaultTableConfig(this.tableName, customerColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Customers table
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the Customers table
    await queryRunner.dropTable(this.tableName, true);
  }
}
