import { useMutation } from 'react-query';

import { signUp } from '../api/mutations';

export const useSignUp = () => useMutation(signUp);
