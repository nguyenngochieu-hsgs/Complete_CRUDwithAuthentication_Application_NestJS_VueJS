import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.validate(username, password);
        if (user) {
            const result = {
                id: user.id,
                username: user.username
            }
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {id: user.id, username: user.username}
        const token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get<number>('JWT_TTL'),
        })
        return {
            token: token
        };
    }
}
