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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) {}

    @Get()
    @ApiOperation({summary: 'Get all tasks'})
    @ApiResponse({status: 200, description: 'return all tasks'})
    getTasks(@Query('projectId') projectId?: string){
        return this.tasksService.getAllTasks(projectId);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get task by id'})
    @ApiResponse({status: 200, description: 'return task by id'})
    @ApiResponse({status: 404, description: 'task not found'})
    getTask(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @ApiOperation({summary: 'Create new task'})
    @ApiResponse({status: 201, description: 'task created successfully'})
    createTask(@Body() dto: CreateTaskDto){
        return this.tasksService.createTask(dto);
    }

    @Patch(':id')
    @ApiOperation({summary: 'update task'})
    @ApiResponse({status: 200, description: 'task updated successfully'})
    @ApiResponse({status: 404, description: 'task not found'})
    updateTask(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto
    ){
        return this.tasksService.updatetask(id, dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete task'})
    @ApiResponse({status: 200, description: 'task deleted successfully'})
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(id);
    }

}