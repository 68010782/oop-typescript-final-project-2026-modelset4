import { IsOptional, IsString, IsEnum, IsDateString} from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsDateString()
    deadline?: Date;
    
}