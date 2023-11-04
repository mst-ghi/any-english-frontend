import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type HelpyType = { active?: boolean; search?: string };
export type StatsCountType = { wordsCount?: number; phrasesCount?: number };

export interface States {
  helpy: HelpyType;
  statsCount?: StatsCountType;
  isInvalidToken?: boolean;
  isLoading?: boolean;
  isLoggedIn?: boolean;
  isUser?: boolean;
  isOperator?: boolean;
  isAdmin?: boolean;
  user?: IUser;
}

export interface Actions {
  setHelpy: (helpy?: HelpyType) => void;
  setStatsCount: (statsCount?: StatsCountType) => void;
  setIsInvalidToken: (isInvalidToken?: boolean) => void;
  setIsLoading: (isLoggedIn?: boolean) => void;
  setIsLoggedIn: (isLoggedIn?: boolean) => void;
  setIsUser: (isUser?: boolean) => void;
  setIsOperator: (isOperator?: boolean) => void;
  setIsAdmin: (isAdmin?: boolean) => void;
  setUser: (user?: IUser) => void;
}

const InitStoreData: States = {
  isLoading: true,
  isLoggedIn: false,
  helpy: {
    active: false,
    search: '',
  },
};

const useApp = create(
  immer<States & Actions>((set) => ({
    ...InitStoreData,
    setHelpy: (helpy) => set(() => ({ helpy })),
    setStatsCount: (statsCount) => set(() => ({ statsCount })),
    setIsInvalidToken: (isInvalidToken) => set(() => ({ isInvalidToken })),
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
    setIsUser: (isUser) => set(() => ({ isUser })),
    setIsOperator: (isOperator) => set(() => ({ isOperator })),
    setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
    setUser: (user) =>
      set(() => {
        return {
          user,
          isLoggedIn: Boolean(user),
          isInvalidToken: !Boolean(user),
          isUser: Boolean(user?.access === 'user'),
          isOperator: Boolean(user?.access === 'operator'),
          isAdmin: Boolean(user?.access === 'admin'),
        };
      }),
  })),
);

export default useApp;
