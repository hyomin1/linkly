import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { OAuthProfile } from './dto/oauth-profile.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateOAuthUser(profile: OAuthProfile): Promise<string> {
    const { email, name, picture, provider } = profile;
    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        picture,
        provider,
      },
    });

    return user.email;
  }

  async loginAfterOAuth(email: string): Promise<{
    accessToken: string;
    refreshToken: string;
    userId: number;
  }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다');
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.user.update({
      where: { id: user?.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken, userId: user?.id };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('유효하지 않은 refresh token입니다');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
      };

      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      return { accessToken };
    } catch {
      throw new UnauthorizedException(
        'Refresh token이 만료되었거나 유효하지 않습니다',
      );
    }
  }
  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { refreshToken: null },
      });
    } catch {
      throw new UnauthorizedException('유효하지 않은 refresh token입니다');
    }
  }
}
