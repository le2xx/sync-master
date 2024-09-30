import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлечение токена из заголовка
      ignoreExpiration: false, // Не игнорировать истечение токена
      secretOrKey: configService.get<string>('JWT_SECRET'), // Секретный ключ JWT
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
