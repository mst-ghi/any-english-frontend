import { Envs, getExactCookieName } from '@/utils';
import { cookies } from 'next/headers';

const fetchUserInitData = async () => {
  let user;
  let isInvalidToken;

  const cookie = cookies();
  const token = cookie.get(getExactCookieName('sub-acc-tkn'));

  if (token && token.value) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    };

    try {
      const response = await fetch(
        `${Envs.api.url}/api/v1/auth/user`,
        options,
      ).then((res) => res.json());

      if (response.status === 200) {
        user = response.user;
      } else {
        isInvalidToken = true;
      }
    } catch (error) {
      isInvalidToken = true;
    }
  }

  return {
    user,
    isInvalidToken,
  };
};

const fetchStats = async () => {
  let wordsCount = 0;
  let phrasesCount = 0;
  let response;

  try {
    response = await fetch(`${Envs.api.url}/api/v1/stats/words/count`).then(
      (res) => res.json(),
    );

    if (response.status === 200) {
      wordsCount = response.count;
    }
  } catch (error) {
    console.log('fetch words count error: ', error.message);
  }

  try {
    response = await fetch(`${Envs.api.url}/api/v1/stats/phrases/count`).then(
      (res) => res.json(),
    );

    if (response.status === 200) {
      phrasesCount = response.count;
    }
  } catch (error) {
    console.log('fetch phrases count error: ', error.message);
  }

  return {
    wordsCount,
    phrasesCount,
  };
};

const initData = async () => {
  const { user, isInvalidToken } = await fetchUserInitData();
  const { wordsCount, phrasesCount } = await fetchStats();

  return {
    user,
    isInvalidToken,
    wordsCount,
    phrasesCount,
  };
};

export default initData;
