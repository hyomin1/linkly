import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RequestWithCookies, TokenRequest } from './types/request-extensions';
import { ConfigService } from '@nestjs/config';
import {
  clearAuthCookies,
  setAccessTokenCookie,
  setAuthCookies,
} from './utils/cookie';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private async handleOAuthRedirect(
    req: TokenRequest,
    res: Response,
  ): Promise<void> {
    try {
      const token = await this.authService.loginAfterOAuth(req.user.email);
      setAuthCookies(res, this.configService, token);
    } catch (error) {
      console.error('OAuth 로그인 처리 오류:', error);
      throw new HttpException(
        'OAuth 로그인 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {
    // 구글 로그인 페이지로 리다이렉트
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(
    @Req() req: TokenRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.handleOAuthRedirect(req, res);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoRedirect(
    @Req() req: TokenRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.handleOAuthRedirect(req, res);
  }

  @Get('refresh')
  async refresh(
    @Req() req: RequestWithCookies,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token이 없습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const { accessToken } =
        await this.authService.refreshAccessToken(refreshToken);
      setAccessTokenCookie(res, this.configService, accessToken);
      return { message: 'Token이 갱신되었습니다' };
    } catch (error) {
      console.error('Token 갱신 오류:', error);
      throw new HttpException(
        'Token 갱신에 실패했습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('logout')
  async logout(
    @Req() req: RequestWithCookies,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const refreshToken = req.cookies?.refresh_token;

    if (refreshToken) {
      try {
        await this.authService.logout(refreshToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    clearAuthCookies(res, this.configService);

    return { message: '로그아웃되었습니다' };
  }
}
