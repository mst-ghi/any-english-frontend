export declare global {
  declare module '*.png' {
    const value: any;
    export = value;
  }

  type MakeRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

  type TTextDisplay = 'en' | 'both' | 'fa' | string;

  interface IPaginationMeta {
    total_docs: number;
    take: number;
    total_pages: number;
    page: number;
    has_prev_page: boolean;
    has_next_page: boolean;
    prev: number;
    next: number;
  }

  interface ICallRequestResponse {
    status: number;
    message: string;
    isSuccess: boolean;
    isUnprocessable: boolean;
    errors: SetStateAction<FormErrors>;
    meta?: IPaginationMeta;
  }

  type TUserAccess = 'admin' | 'operator' | 'user';
  type TUserStatus = 'active' | 'suspended';

  interface ITokens {
    token: string;
    r_token: string;
    expires_at: string;
  }

  interface IUser {
    id: string;
    email: string;
    fullname: string;
    access: TUserAccess;
    status: TUserStatus;
    created_at: string;
  }

  interface IPhrase {
    id: string;
    word_id: string;
    phrase: string;
    meaning: string;
    created_at: string;

    lightners?: ILightner[];
  }

  interface IWord {
    id: string;
    word: string;
    meaning: string;
    created_at: string;

    phrases?: IPhrase[];
    lightners?: ILightner[];
  }

  type TLightnerLevel = 0 | 1 | 2 | 3 | 4 | number;
  type TLightnerType = 'word' | 'phrase';

  interface ILightner {
    id: string;
    user_id: string;
    word_id?: string;
    phrase_id?: string;
    level: TLightnerLevel;
    created_at?: string;

    user?: IUser;
    word?: IWord;
    phrase?: IPhrase;
  }

  interface IConversationItem {
    id: string;
    conversation_id: string;
    character: string;
    phrase: string;
    meaning: string;
    created_at?: string;
  }

  interface IConversation {
    id: string;
    title: string;
    meaning: string;
    characters: string[];
    created_at?: string;

    items?: IConversationItem[];
  }
}
