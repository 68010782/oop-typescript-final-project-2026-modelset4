import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ProjectService } from '../project/project.service';

@Module({
    controllers: [TasksController],
    providers: [TasksService,ProjectService],
    exports: [TasksService]
})
export class TaskModule {}

