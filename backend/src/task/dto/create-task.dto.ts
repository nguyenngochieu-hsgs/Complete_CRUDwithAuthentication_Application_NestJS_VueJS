import { IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;
}