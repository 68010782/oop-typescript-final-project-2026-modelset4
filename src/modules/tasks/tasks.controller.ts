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

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @Get()
  getTasks(@Query('projectId') projectId?: string) {
    return this.tasksService.getAllTasks(Number(projectId!));
  }

  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Update task partially' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto
  ) {
    return this.tasksService.updateTask(id, dto);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

}