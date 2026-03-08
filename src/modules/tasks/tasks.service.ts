import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Task } from './task.interface';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {v4 as uuid} from 'uuid';
import { ProjectService } from '../project/project.service';


@Injectable()
export class TasksService {

    
  private tasks: Task[] = [];

  constructor(private projectsService: ProjectService) {}

  findByProjectId(projectId: number): Task[] {
    return this.tasks.filter(task => task.projectId === projectId);
  }

  getAllTasks(projectId?: number): Task[] {

    if (projectId !== undefined) {
      return this.tasks.filter(task => task.projectId === projectId);
    }

    return this.tasks;
  }

  getTaskById(id: string): Task {

    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(dto: CreateTaskDto): Task {

    const project = this.projectsService.getProjectById(dto.projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const deadline = new Date(dto.deadline);

    if (isNaN(deadline.getTime())) {
      throw new BadRequestException('Invalid deadline');
    }

    if (deadline > project.deadline) {
      throw new BadRequestException(
        'Task deadline cannot be later than project deadline'
      );
    }

    const task: Task = {
      id: uuid(),
      title: dto.title,
      deadline: deadline,
      projectId: dto.projectId,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, dto: UpdateTaskDto): Task {

    const task = this.getTaskById(id);

    if (dto.title !== undefined) {
      task.title = dto.title;
    }

    if (dto.deadline !== undefined) {

      const deadline = new Date(dto.deadline);

      if (isNaN(deadline.getTime())) {
        throw new BadRequestException('Invalid deadline');
      }

      const project = this.projectsService.getProjectById(task.projectId);

      if (deadline > project.deadline) {
        throw new BadRequestException(
          'Task deadline cannot be later than project deadline'
        );
      }

      task.deadline = deadline;
    }

    if (dto.status !== undefined) {
      task.status = dto.status;
    }

    return task;
  }

  patchTask(id: string, dto: UpdateTaskDto): Task {

    const task = this.getTaskById(id);

    if (dto.title !== undefined) {
      task.title = dto.title;
    }

    if (dto.deadline !== undefined) {

      const deadline = new Date(dto.deadline);

      if (isNaN(deadline.getTime())) {
        throw new BadRequestException('Invalid deadline');
      }

      const project = this.projectsService.getProjectById(task.projectId);

      if (deadline > project.deadline) {
        throw new BadRequestException(
          'Task deadline cannot be later than project deadline'
        );
      }

      task.deadline = deadline;
    }

    if (dto.status !== undefined) {
      task.status = dto.status;
    }

    return task;
  }

  deleteTask(id: string): void {

    const task = this.getTaskById(id);

    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}
