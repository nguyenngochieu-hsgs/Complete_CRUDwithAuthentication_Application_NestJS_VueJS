import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from './../auth/jwt.guard';
import { TaskService } from './task.service';
import { Controller, UseGuards, Post, Get, Body, Req, Res, HttpStatus, HttpException, Param, Delete, Put } from '@nestjs/common';
import { Response, Request } from 'express';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req, @Res() res: Response){
        const newTask = await this.taskService.createTask(req.user.id, createTaskDto);
        if (newTask){
            return res.status(HttpStatus.CREATED).json({
                message: 'Task is created',
                successs: true
            })
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Task is not created, please try again',
            success: false
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAll(@Req() req, @Res() res: Response) {
        const tasks = await this.taskService.getAllTasks(req.user.id);
        if (tasks){
            console.log(tasks);
            return res.status(HttpStatus.CREATED).json({
                message: 'Task is created',
                tasks: tasks,
                successs: true
            })
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Task is not created, please try again',
            success: false
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') taskId: string, @Res() res: Response, @Req() req) {
        const task = await this.taskService.getTaskById(req.user.id, parseInt(taskId));
        if (task){
            return res.status(HttpStatus.OK).json({
                message: 'Get task successfully',
                task: task,
                success: true
            });
        }
        throw new HttpException('TaskID is not found or your user does not have this taskID',HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateOne(@Body() updateTaskDto: UpdateTaskDto, @Param('id') taskId: string, @Res() res: Response, @Req() req) {
        const task = await this.taskService.updateTask(req.user.id, parseInt(taskId), updateTaskDto);
        if (task) {
            return res.status(HttpStatus.OK).json({
                message: 'Delete task successfully',
                task: task,
                success: true
            })
        }
        throw new HttpException('TaskID is not found or your user does not have this taskID',HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOne(@Param('id') taskId: string, @Res() res: Response, @Req() req) {
        const task = await this.taskService.deleteTask(req.user.id, parseInt(taskId));
        if (task) {
            return res.status(HttpStatus.OK).json({
                message: 'Delete task successfully',
                task: task,
                success: true
            })
        }
        throw new HttpException('TaskID is not found or your user does not have this taskID',HttpStatus.BAD_REQUEST);
    }
}
