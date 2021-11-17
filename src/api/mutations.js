import { Auth } from 'aws-amplify';

export const signIn = async ({ email, password }) =>
  Auth.signIn(email, password);

export const signUp = async ({ email, password, name }) =>
  Auth.signUp({
    password,
    username: email,
    attributes: { name },
  });
