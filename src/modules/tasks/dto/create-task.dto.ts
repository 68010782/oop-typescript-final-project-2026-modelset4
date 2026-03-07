import {IsString, IsDateString} from 'class-validator';

export class CreateTaskDto {

    @IsString()
    title!: string;

    @IsDateString()
    deadline!: string;

    @IsString()
    projectId!: number;

}
