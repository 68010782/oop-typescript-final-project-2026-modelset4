import { Injectable, BadRequestException } from '@nestjs/common';
import { Project } from './project.interface';
import { CreateProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectService {
    private projects: Project[] = [];
  private nextId = 1;

  create(dto: CreateProjectDto): Project {
    const deadlineDate = new Date(dto.deadline);

    if (deadlineDate < new Date()) {
      throw new BadRequestException('Deadline cannot be in the past');
    }

    const newProject: Project = {
      id: this.nextId++,
      name: dto.name,
      description: dto.description,
      status: dto.status,
      deadline: deadlineDate,
      createdAt: new Date(),
    };

    this.projects.push(newProject);
    return newProject;
  }
}

