import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TaskModule } from '../tasks/tasks.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [TaskModule],
  exports: [ProjectService],
})
export class ProjectModule {}
