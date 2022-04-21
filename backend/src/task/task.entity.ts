import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column({ default: '' })
    description: string;

    @ManyToOne( () => UserEntity, user => user.tasks)
    user: UserEntity;
}