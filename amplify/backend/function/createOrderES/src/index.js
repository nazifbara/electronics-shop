/* Amplify Params - DO NOT EDIT
	API_ELECTRONICSSHOP_GRAPHQLAPIIDOUTPUT
	API_ELECTRONICSSHOP_ORDERPRODUCTTABLE_ARN
	API_ELECTRONICSSHOP_ORDERPRODUCTTABLE_NAME
	API_ELECTRONICSSHOP_ORDERTABLE_ARN
	API_ELECTRONICSSHOP_ORDERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const ORDER_TABLE = process.env.API_ELECTRONICSSHOP_ORDERTABLE_NAME;
const ORDER_TYPE = 'Order';
const ORDER_PRODUCT_TABLE =
  process.env.API_ELECTRONICSSHOP_ORDERPRODUCTTABLE_NAME;
const ORDER_PRODUCT_TYPE = 'OrderProduct';

const createOrder = async (payload) => {
  const { order_id, user, ...other } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      user,
      ...other,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createOrderProduct = async (payload) => {
  let productOrders = [];
  for (let i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    productOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: ORDER_PRODUCT_TYPE,
          product_id: cartItem.id,
          order_id: payload.order_id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }
  let params = {
    RequestItems: {},
  };
  params['RequestItems'][ORDER_PRODUCT_TABLE] = productOrders;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};

/*
 * Get order details from processPayment lambda
 * Create an order
 * Link games to the order - Users can see the past orders and admins can view orders by user
 * Email the invoice (Will be added later)
 */
exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.order_id = uuidv4();

    await createOrder(payload);

    await createOrderProduct(payload);

    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
