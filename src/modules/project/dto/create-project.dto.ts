import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(ProjectStatus)
  status!: ProjectStatus;

  @IsDateString()
  deadline!: string;
}