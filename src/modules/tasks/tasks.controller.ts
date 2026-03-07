import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    Query
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse,ApiOperation } from '@nestjs/swagger';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) {}

    @Post()
    createTask(@Body() dto: CreateTaskDto){
        return this.tasksService.createTask(dto);
    }

    @Get()
    getTasks(@Query('projectId') projectId?: number){
        return this.tasksService.getAllTasks(projectId);
    }

    @Get(':id')
    getTask(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.tasksService.updatetask(id, dto);
    }

    @Patch(':id')
    patchTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.tasksService.patchTask(id, dto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(id);
    }

}