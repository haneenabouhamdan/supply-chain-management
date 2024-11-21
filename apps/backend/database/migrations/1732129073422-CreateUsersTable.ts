import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { userColumns } from '../columns';
import { defaultTableConfig } from '../config';

export class CreateUsersTable1732050632630 implements MigrationInterface {
  tableName = TableNames.users;

  private table = defaultTableConfig(this.tableName, userColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
