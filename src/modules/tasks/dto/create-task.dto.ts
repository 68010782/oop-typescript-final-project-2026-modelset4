import {IsString, IsDateString, IsNumber} from 'class-validator';

export class CreateTaskDto {

    @IsString()
    title!: string;

    @IsDateString()
    deadline!: string;

    @IsNumber()
    projectId!: number;

}
