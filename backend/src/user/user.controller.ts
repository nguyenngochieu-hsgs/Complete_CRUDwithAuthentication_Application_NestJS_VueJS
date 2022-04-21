import { JwtAuthGuard } from './../auth/jwt.guard';
import { LocalAuthGuard } from './../auth/local.guard';
import { AuthService } from './../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Res, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    //User authen
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const registerResult = await this.userService.create(createUserDto);
        if (registerResult) {
            return res.status(HttpStatus.CREATED).json({
                message: 'Register successfully',
                user: registerResult,
                success: true,
            })
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Interval server error',
            user: {},
            success: false,
        })
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const login_token = await this.authService.login(req.user);
        res.cookie('auth-cookie', login_token, {httpOnly: true});
        return {
            message: 'Login successfully',
            success: true
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async myinfo(@Request() req){
        return req.user;
    }
}
