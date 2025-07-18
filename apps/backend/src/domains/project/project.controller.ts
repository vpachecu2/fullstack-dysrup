import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './services/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Get()
  findAllProjects() {
    return this.projectService.findAll();
  }

  @Post(':projectId/tasks')
  addTask(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return this.projectService.addTaskToProject(projectId, dto);
  }

  @Get(':projectId/tasks')
  getTasks(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectService.getTasksFromProject(projectId);
  }
}
