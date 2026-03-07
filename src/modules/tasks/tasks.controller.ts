import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query('projectId') projectId?: string){
        return this.tasksService.getAllTasks(projectId);
    }

    @Get(':id')
    getTask(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto){
        return this.tasksService.createTask(dto);
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto
    ){
        return this.tasksService.updatetask(id, dto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(id);
    }

}