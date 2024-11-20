import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { userTokenColumns } from '../columns';

export class CreateUsersTokensTable1732136193123 implements MigrationInterface {
  tableName = TableNames.tokens; // Tokens table name
  private table = defaultTableConfig(this.tableName, userTokenColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Tokens table
    await queryRunner.createTable(this.table, true);

    // Add foreign key for user_id
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: TableNames.users, // Reference the Users table
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Get the Tokens table
    const table = await queryRunner.getTable(this.tableName);

    // Drop the foreign key
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey(this.tableName, foreignKey);
    }

    // Drop the Tokens table
    await queryRunner.dropTable(this.tableName, true);
  }
}
