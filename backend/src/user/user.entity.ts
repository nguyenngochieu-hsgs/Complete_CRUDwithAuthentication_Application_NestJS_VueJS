import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
import { TaskEntity } from "src/task/task.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @OneToMany(() => TaskEntity, task => task.user)
    tasks: TaskEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}