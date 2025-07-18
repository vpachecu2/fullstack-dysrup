import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return { message: 'Project created', payload: createProjectDto };
  }

  @Get()
  getAllProjects() {
    return { message: 'List all projects' };
  }

  @Post(':projectId/tasks')
  addTaskToProject(@Param('projectId') projectId: string, @Body() createTaskDto: CreateTaskDto) {
    return { message: `Task added to project ${projectId}`, payload: createTaskDto };
  }

  @Get(':projectId/tasks')
  getTasksFromProject(@Param('projectId') projectId: string) {
    return { message: `Tasks for project ${projectId}` };
  }
}
