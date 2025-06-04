import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { OAuthProfile } from '../dto/oauth-profile.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID')!;
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET')!;
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URI')!;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth configuration is missing');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ): Promise<void> {
    try {
      const { name, emails, photos } = profile;

      if (!emails?.[0]?.value) {
        throw new Error('이메일이 제공되지 않았습니다');
      }

      const user: OAuthProfile = {
        email: emails?.[0].value,
        name: name?.givenName,
        picture: photos?.[0].value,
        provider: 'google',
      };
      const token = await this.authService.validateOAuthUser(user);
      done(null, { token, email: user.email });
    } catch (error) {
      done(error, false);
    }
  }
}
