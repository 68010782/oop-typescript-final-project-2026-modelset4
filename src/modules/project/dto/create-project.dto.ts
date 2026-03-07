import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  
  @ApiProperty({
    example: "Project Management System",
    description: "Name of the project"
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: "A backend system for managing projects and tasks",
    description: "Short description of the project"
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: "Active,Cancleled",
    description: "Status of projects"
  })
  @IsEnum(ProjectStatus)
  status!: ProjectStatus;

  @ApiProperty({
    example: "2026-12-31",
    description: "Project deadline (YYYY-MM-DD)"
  })
  @IsDateString()
  deadline!: string;
}