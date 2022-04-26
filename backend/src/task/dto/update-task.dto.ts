import { CreateTaskDto } from './create-task.dto';
import { IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;
};