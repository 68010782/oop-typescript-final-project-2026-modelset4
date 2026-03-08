import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ProjectModule } from '../project/project.module';

@Module({
    controllers: [TasksController],
    imports: [ProjectModule],
    providers: [TasksService],
    exports: [TasksService],
    
})
export class TaskModule {}

