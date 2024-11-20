import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { supplierColumns } from '../columns';

export class CreateSuppliersTable1732136272538 implements MigrationInterface {
  tableName = TableNames.suppliers;
  private table = defaultTableConfig(this.tableName, supplierColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
