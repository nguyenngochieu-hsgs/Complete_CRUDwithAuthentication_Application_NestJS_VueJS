import { UserEntity } from './../user/user.entity';
import { UserModule } from './../user/user.module';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, UserEntity]), 
    forwardRef(()=>UserModule)
  ],
  providers: [TaskService],
  controllers: [TaskController],
  // exports: [TaskService],
})
export class TaskModule {}
