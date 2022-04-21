import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(request: Request, username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Username or password is not true');
        }
        return user;
    }
}