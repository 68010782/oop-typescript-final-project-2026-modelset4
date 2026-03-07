import {IsString, IsDateString, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTaskDto {

    @ApiProperty({
        example: "ADD features",
        description: "Title/Name of the task"
      })
    @IsString()
    title!: string;

    @ApiProperty({
        example: "2026-12-31",
        description: "Task deadline (YYYY-MM-DD)"
      })
    @IsDateString()
    deadline!: string;

    @ApiProperty({
        example: "1",
        description: "ProjectId of the task"
      })
    @IsNumber()
    projectId!: number;

}
