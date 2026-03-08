import {IsString, IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

    @ApiProperty({
        example: "Finish API documentation",
        description: "Task title"
    })
    @IsString()
    title!: string;

    @ApiProperty({
        example: "2026-12-12",
        description: "Task deadline(ISO date format)"
    })
    @IsDateString()
    deadline!: string;


    @ApiProperty({
        example: "project123",
        description: "Project ID that this task belongs to"
    })
    @IsString()
    projectId!: string;

}
