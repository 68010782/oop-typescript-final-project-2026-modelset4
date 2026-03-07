import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(projectId?: string): Task[] {
        if (projectId){
            return this.tasks.filter(task => task.projectId === projectId);
        
        }

        return this.tasks;

    }

    getTaskById(id: string): Task {

        const task = this.tasks.find(t => t.id === id);

        if (!task){
            throw new NotFoundException('Task not found');
        }

        return task;

    }

    createTask(dto: CreateTaskDto): Task{

        const task: Task = {
            id: uuid(),
            title: dto.title,
            deadline: new Date(dto.deadline),
            projectId: dto.projectId,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;

    }
    updatetask(id: string, dto: UpdateTaskDto): Task{

        const task = this.getTaskById(id);

        Object.assign(task,dto);

        return task;

    }

    deleteTask(id: string): void{

        const task = this.getTaskById(id);

        this.tasks = this.tasks.filter(t => t.id !== task.id);
        
    }
}