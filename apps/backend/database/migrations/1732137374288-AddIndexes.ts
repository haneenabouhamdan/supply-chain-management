import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNames } from '../type';

export class AddIndexes1732137374288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add index on `customer_id` in Orders table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDERS_CUSTOMER_ID
          ON ${TableNames.orders} (customer_id);
        `);

    // Add index on `supplier_id` in Orders table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDERS_SUPPLIER_ID
          ON ${TableNames.orders} (supplier_id);
        `);

    // Add index on `shipment_id` in Orders table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDERS_SHIPMENT_ID
          ON ${TableNames.orders} (shipment_id);
        `);

    // Add index on `order_id` in Order Items table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDER_ITEMS_ORDER_ID
          ON ${TableNames.orderItems} (order_id);
        `);

    // Add index on `product_id` in Order Items table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDER_ITEMS_PRODUCT_ID
          ON ${TableNames.orderItems} (product_id);
        `);

    // Add composite index on `order_id` and `product_id` in Order Items table
    await queryRunner.query(`
          CREATE INDEX IDX_ORDER_ITEMS_ORDER_PRODUCT
          ON ${TableNames.orderItems} (order_id, product_id);
        `);

    // Add index on `driver_id` in Shipments table
    await queryRunner.query(`
          CREATE INDEX IDX_SHIPMENTS_DRIVER_ID
          ON ${TableNames.shipments} (driver_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop index on `customer_id` in Orders table
    await queryRunner.query(`
          DROP INDEX IDX_ORDERS_CUSTOMER_ID;
        `);

    // Drop index on `supplier_id` in Orders table
    await queryRunner.query(`
          DROP INDEX IDX_ORDERS_SUPPLIER_ID;
        `);

    // Drop index on `shipment_id` in Orders table
    await queryRunner.query(`
          DROP INDEX IDX_ORDERS_SHIPMENT_ID;
        `);

    // Drop index on `order_id` in Order Items table
    await queryRunner.query(`
          DROP INDEX IDX_ORDER_ITEMS_ORDER_ID;
        `);

    // Drop index on `product_id` in Order Items table
    await queryRunner.query(`
          DROP INDEX IDX_ORDER_ITEMS_PRODUCT_ID;
        `);

    // Drop composite index on `order_id` and `product_id` in Order Items table
    await queryRunner.query(`
          DROP INDEX IDX_ORDER_ITEMS_ORDER_PRODUCT;
        `);

    // Drop index on `driver_id` in Shipments table
    await queryRunner.query(`
          DROP INDEX IDX_SHIPMENTS_DRIVER_ID;
        `);
  }
}
