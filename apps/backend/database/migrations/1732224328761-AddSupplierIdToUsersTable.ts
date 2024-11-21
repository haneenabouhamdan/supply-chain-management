import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';

export class AddSupplierIdToUsersTable1732224328761
  implements MigrationInterface
{
  private tableName = TableNames.users;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['supplier_id'], // Column in Users table
        referencedTableName: TableNames.suppliers, // Target table
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('supplier_id') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey(this.tableName, foreignKey);
    }
  }
}
