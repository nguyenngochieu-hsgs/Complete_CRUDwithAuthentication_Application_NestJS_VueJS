import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from './../user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskEntity) private taskRepository: Repository<TaskEntity>, @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async getAllTasks(userId: string) {
        const tasks = await this.taskRepository.find({where: {user: userId}});
        return tasks;
    }

    async getTaskById(userId: string, taskId: number) {
        const task = await this.taskRepository.findOne({ where: {id: taskId, user: userId }});
        if (task) {
            return task;
        }
        return null;
    }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        let newTask = new TaskEntity();
        newTask.title = createTaskDto.title;
        newTask.description = createTaskDto.description;
        newTask = await this.taskRepository.save(newTask);

        const user = await this.userRepository.findOne({where: {id: userId}, relations:['tasks']});
        user.tasks.push(newTask);
        await this.userRepository.save(user);
        return newTask;
    }

   async updateTask(userId: string, taskId: number, updateTaskDto: UpdateTaskDto) {
       await this.taskRepository.update({id: taskId}, updateTaskDto);
       const updateTask = await this.taskRepository.findOne({ where: {id: taskId, user: userId}});
       if (!updateTask) {
           return null;
       }
       return updateTask;
   }
    
    async deleteTask(userId: string, taskId: number) {
        const task = await this.taskRepository.findOne({ where: {id: taskId, user: userId}});
        if (!task) {
            return null;
        }
        const deleteResult = await this.taskRepository.remove(task);
        return deleteResult;
    }
}
