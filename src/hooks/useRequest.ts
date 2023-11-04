import { FormErrors } from '@mantine/form';
import { Envs, getCookie, urlQueryString } from '@/utils';
import { SetStateAction, useState } from 'react';
import { showNotification } from '@mantine/notifications';

const useRequest = () => {
  const [isCalling, setIsCalling] = useState(false);

  const getBaseHeaders = (init?: any) => {
    const headers = init || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const accTkn = getCookie('sub-acc-tkn');
    if (accTkn) {
      headers['Authorization'] = `Bearer ${accTkn}`;
    }

    headers['x-timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return headers;
  };

  const callRequest = async <T>(
    method: MakeRequestMethods = 'GET',
    path: string,
    init?: {
      body?: any;
      params?: any;
      headers?: any;
      withoutStringifyBody?: boolean;
    },
  ): Promise<ICallRequestResponse & T> => {
    setIsCalling(true);

    const headers = getBaseHeaders(init?.headers);
    let body = undefined;

    if (init?.body) {
      if (init?.withoutStringifyBody) {
        body = init?.body;
      } else {
        body = JSON.stringify(init?.body);
      }
    }

    let url = `${Envs.api.url}${path}`;

    if (init?.params) {
      url += '?' + urlQueryString(init.params);
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
      redirect: 'manual',
    }).then(async (res) => {
      let response;
      let isSuccess;
      let isUnprocessable;
      let data: any = {};
      const errors: SetStateAction<FormErrors> = {};

      try {
        response = await res.json();
        isSuccess = response.status === 200;
        isUnprocessable = response.status === 422;

        if (response.status >= 500 && response.status < 600) {
          showNotification({
            color: 'red',
            message: 'Internal server error. Please contact support',
          });
        }

        data = response || {};

        if (isUnprocessable && response.errors && response.errors[0]) {
          for (const err of response.errors) {
            errors[err.field] = err.message;
          }
        }
      } catch (error) {
        //
      }

      return {
        ...data,
        isSuccess,
        isUnprocessable,
        errors,
      };
    });

    setIsCalling(false);

    return response;
  };

  return {
    isCalling,
    getBaseHeaders,
    callRequest,
  };
};

export default useRequest;
