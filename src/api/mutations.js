import { Auth } from 'aws-amplify';

export const signUp = async (formData) => {
  const { email, password, name } = formData;

  return Auth.signUp({
    password,
    username: email,
    attributes: { name },
  });
};
