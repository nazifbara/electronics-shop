// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "SUCCESS": "SUCCESS",
  "FAILED": "FAILED"
};

const { Order, OrderProduct, Product, Category } = initSchema(schema);

export {
  Order,
  OrderProduct,
  Product,
  Category,
  OrderStatus
};