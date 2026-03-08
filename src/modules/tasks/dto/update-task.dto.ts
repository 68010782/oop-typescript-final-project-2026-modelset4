import { IsOptional, IsString, IsEnum, IsDateString} from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {

    @ApiPropertyOptional({
        example: "update API documentation",
        description: "updated task title"
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        enum: TaskStatus,
        example: TaskStatus.OPEN,
        description: "Task status"
    })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiPropertyOptional({
        example: "2026-12-12",
        description: "new task deadline"
    })
    @IsOptional()
    @IsDateString()
    deadline?: string;
    
}


