/* Amplify Params - DO NOT EDIT
	AUTH_ELECTRONICSSHOP8FBCA850_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const {
  CognitoIdentityServiceProvider,
} = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = process.env.AUTH_ELECTRONICSSHOP8FBCA850_USERPOOLID;
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const getUserInfo = async (event) => {
  console.log({ event });

  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username,
  };
  const user = await cognitoIdentityServiceProvider
    .adminGetUser(params)
    .promise();

  if (!user) {
    throw new Error('User not found');
  }

  console.log({ user });

  const userInfo = user.UserAttributes.reduce(
    (userInfo, { Name, Value }) => ({ ...userInfo, [Name]: [Value] }),
    {}
  );

  console.log({ userInfo });

  return userInfo;
};

/*
 * Get the total price of the order
 * Charge the customer
 */
exports.handler = async (event) => {
  console.log(event);
  try {
    const { cart, total, token, country, zipCode, address } =
      event.arguments.input;
    const { email, name } = await getUserInfo(event);

    await stripe.charges.create({
      amount: total,
      currency: 'usd',
      source: token,
      description: `Order ${new Date()} by ${name} with ${email} email`,
    });
    return { cart, total, address, user: email, country, zipCode };
  } catch (err) {
    throw new Error(err);
  }
};
