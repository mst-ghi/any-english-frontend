import { showNotification } from '@mantine/notifications';
import useRequest from '@/hooks/useRequest';
import { useApp } from '@/hooks';
import { forceReload, removeAllCookies, setCookie } from '@/utils';
import { useState } from 'react';

const useAuth = () => {
  const states = useApp();
  const { callRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const setTokensToCookies = (tokens: ITokens) => {
    setCookie('sub-acc-tkn', tokens.token);
    setCookie('sub-ref-tkn', tokens.r_token);
    setCookie('sub-exp-tkn', tokens.expires_at);
  };

  const clearAuthData = () => {
    states.setUser();
    removeAllCookies();
  };

  const logout = () => {
    clearAuthData();
    forceReload('/');
  };

  const fetchUser = async () => {
    let user;
    states.setIsLoading(true);

    try {
      const response = await callRequest<{ user: IUser }>(
        'GET',
        '/api/v1/auth/user',
      );

      if (response.status === 200) {
        states.setUser(response.user);
        user = response.user;
      }
    } catch (error) {
      console.log('fetchUser', error);
    }

    states.setIsLoading(false);
    return user;
  };

  const loginRequest = async (
    body: {
      email: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: (ICallRequestResponse & { tokens: ITokens }) | undefined;

    try {
      response = await callRequest<{ tokens: ITokens }>(
        'POST',
        '/api/v1/auth/login',
        {
          body,
        },
      );

      if (response?.isSuccess) {
        setTokensToCookies(response.tokens);
        forceReload(redirectUrl);
      } else {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('loginRequest', error);
    }

    setLoading(false);
    return response;
  };

  const registerRequest = async (
    body: {
      email: string;
      fullname: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: (ICallRequestResponse & { tokens: ITokens }) | undefined;

    try {
      response = await callRequest<{ tokens: ITokens }>(
        'POST',
        '/api/v1/auth/register',
        {
          body,
        },
      );

      if (response?.isSuccess) {
        setTokensToCookies(response.tokens);
        forceReload(redirectUrl);
      } else {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('registerRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    ...states,
    loading,
    setTokensToCookies,
    clearAuthData,
    refetchUser: fetchUser,
    loginRequest,
    registerRequest,
    logout,
  };
};

export default useAuth;
