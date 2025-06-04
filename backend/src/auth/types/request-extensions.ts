import { Request } from 'express';

export interface RequestWithCookies extends Request {
  cookies: {
    access_token?: string;
    refresh_token?: string;
  };
}
export interface TokenRequest extends Request {
  user: {
    token: string;
    email: string;
  };
}
