import { UserEntity } from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}
    
    //For Authentication
    async validate(username: string, password: string) {
        const user = await this.userRepository.findOne({where: {username}});
        if (user) {
            const matchPassword = await argon2.verify(user.password, password);
            if (matchPassword){
                return user;
            }
        }

        return null;
    }

    //For CRUD
    async create(createUserDto: CreateUserDto) {
        const {username, password} = createUserDto;
        const existedUser = await this.userRepository.findOne({where : {username: username}});

        if (existedUser) {
            throw new HttpException('Username has already been used', HttpStatus.BAD_REQUEST);
        }

        let newUser = new UserEntity();
        newUser.username = username;
        newUser.password = password;
        newUser.tasks = [];

        try {
            newUser = await this.userRepository.save(newUser);
            const result = {
                userId: newUser.id,
                username: newUser.username,
            }
            return result;
        } catch(error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({where: {id: id}});
        return {
            id: user.id,
            username: user.username
        }
    }

}
