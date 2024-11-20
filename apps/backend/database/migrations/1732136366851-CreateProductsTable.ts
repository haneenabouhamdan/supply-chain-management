import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { productColumns } from '../columns';

export class CreateProductsTable1732136366851 implements MigrationInterface {
  tableName = TableNames.products;
  private table = defaultTableConfig(this.tableName, productColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
