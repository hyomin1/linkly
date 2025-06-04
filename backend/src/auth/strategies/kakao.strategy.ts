import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { VerifiedCallback } from 'passport-jwt';
import { OAuthProfile } from '../dto/oauth-profile.dto';

interface KakaoProfileJson {
  id: number;
  kakao_account?: {
    email?: string;
  };
  properties?: {
    profile_image?: string;
  };
}

interface ExtendedKakaoProfile extends Profile {
  _json: KakaoProfileJson;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const clientID = configService.get<string>('KAKAO_CLIENT_ID')!;
    const clientSecret = configService.get<string>('KAKAO_CLIENT_SECRET')!;
    const callbackURL = configService.get<string>('KAKAO_CALLBACK_URI')!;
    super({
      clientID,
      clientSecret,
      callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    try {
      const kakaoProfile = profile as ExtendedKakaoProfile;
      const {
        username: name,
        _json: {
          kakao_account: { email } = {},
          properties: { profile_image: picture } = {},
        },
      } = kakaoProfile;
      if (!email) {
        throw new Error('이메일이 제공되지 않았습니다');
      }
      const user: OAuthProfile = {
        email,
        name,
        picture,
        provider: 'kakao',
      };

      const token = await this.authService.validateOAuthUser(user);
      done(null, { token, email: user.email });
    } catch (error) {
      done(error, false);
    }
  }
}
