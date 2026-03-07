import { Controller,Get,Post,Put,Delete,Param,Body,Patch,ParseIntPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Project } from './project.interface';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as SwaggerApiResponse,ApiOperation } from '@nestjs/swagger';


@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() dto: CreateProjectDto): ApiResponse<Project> {
    const project = this.projectService.create(dto);

    return {
      success: true,
      message: 'Project created successfully',
      data: project,
    };
  }

  @ApiOperation({ summary: 'Get all projects' })
  @SwaggerApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  @Get()
  findAll(): ApiResponse<Project[]> {
    return {
      success: true,
      message: 'Projects retrieved successfully',
      data: this.projectService.findAll(),
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<Project> {
    return {
      success: true,
      message: 'Project retrieved successfully',
      data: this.projectService.findOne(id),
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProjectDto,
  ): ApiResponse<Project> {
    return {
      success: true,
      message: 'Project updated successfully',
      data: this.projectService.update(id, dto),
    };
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<null> {
    this.projectService.remove(id);

    return {
      success: true,
      message: 'Project deleted successfully',
      data: null,
    };
  }

    @Patch(':id')
    patch(
     @Param('id', ParseIntPipe) id: number,
     @Body() dto: UpdateProjectDto,
    ): ApiResponse<Project> {
    return {
        success: true,
        message: 'Project updated partially',
        data: this.projectService.patch(id, dto),
        };
    }
}