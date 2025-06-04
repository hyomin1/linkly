export interface OAuthProfile {
  email: string;
  name?: string;
  picture?: string;
  provider: 'google' | 'kakao';
}
