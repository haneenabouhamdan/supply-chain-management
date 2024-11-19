import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { permissionColumns } from '../columns';

export class CreatePermissionsTable1732050583513 implements MigrationInterface {
  tableName = TableNames.permissions;
  private table = defaultTableConfig(this.tableName, permissionColumns);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
