import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { roleColumns } from '../columns';

export class CreateRolesTable1732050632628 implements MigrationInterface {
  tableName = TableNames.roles;
  referencedTableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, roleColumns);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
