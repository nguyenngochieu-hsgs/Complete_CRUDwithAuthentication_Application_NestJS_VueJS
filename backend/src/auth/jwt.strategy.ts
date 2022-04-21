import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService, private configService: ConfigService) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request?.cookies['auth-cookie'];
                if (!data){
                    return null;
                }
                return data.token;
            }])
        })
    }

    async validate(payload: any) {
        const user = await this.userService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}