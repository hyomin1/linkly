import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export function setAuthCookies(
  res: Response,
  configService: ConfigService,
  tokens: { accessToken: string; refreshToken: string },
) {
  const accessTokenExpireMs = configService.get<number>(
    'ACCESS_TOKEN_EXPIRE_MS',
  )!;

  const refreshTokenExpireMs = configService.get<number>(
    'REFRESH_TOKEN_EXPIRE_MS',
  )!;
  const frontendUrl = configService.get<string>('FRONTEND_URL')!;
  const { accessToken, refreshToken } = tokens;
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: accessTokenExpireMs,
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: refreshTokenExpireMs,
  });
  res.redirect(frontendUrl);
}

export function setAccessTokenCookie(
  res: Response,
  configService: ConfigService,
  accessToken: string,
): void {
  const accessTokenExpireMs =
    configService.get<number>('ACCESS_TOKEN_EXPIRE_MS') ?? 3600000;

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: accessTokenExpireMs,
  });
}

export function clearAuthCookies(
  res: Response,
  configService: ConfigService,
): void {
  const accessTokenExpireMs = configService.get<number>(
    'ACCESS_TOKEN_EXPIRE_MS',
  )!;

  const refreshTokenExpireMs = configService.get<number>(
    'REFRESH_TOKEN_EXPIRE_MS',
  )!;
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: accessTokenExpireMs,
  });
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: refreshTokenExpireMs,
  });
}
