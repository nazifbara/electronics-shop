import { useMutation } from 'react-query';

import { signUp, signIn } from '../api/mutations';

export const useSignIn = () => useMutation(signIn);

export const useSignUp = () => useMutation(signUp);
