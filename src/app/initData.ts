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
  let conversationsCount = 0;
  let response;

  try {
    response = await fetch(`${Envs.api.url}/api/v1/stats`).then((res) =>
      res.json(),
    );

    if (response.status === 200) {
      wordsCount = response.words;
      phrasesCount = response.phrases;
      conversationsCount = response.conversations;
    }
  } catch (error) {
    console.log('fetch all stats error: ', error.message);
  }

  return {
    wordsCount,
    phrasesCount,
    conversationsCount,
  };
};

const initData = async () => {
  const { user, isInvalidToken } = await fetchUserInitData();
  const { wordsCount, phrasesCount, conversationsCount } = await fetchStats();

  return {
    user,
    isInvalidToken,
    wordsCount,
    phrasesCount,
    conversationsCount,
  };
};

export default initData;
