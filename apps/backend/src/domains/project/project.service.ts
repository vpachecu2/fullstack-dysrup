import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { Task } from '../task/task.entity';
import { TaskRepository } from '../task/task.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectsRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: ProjectsRepository,

    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) { }

  async create(dto: CreateProjectDto) {
    const project = this.projectRepository.create(dto);
    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find({ relations: ['tasks'] });
  }

  async addTaskToProject(projectId: string, dto: CreateTaskDto) {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Projeto não encontrado');

    const task = this.taskRepository.create({ ...dto, project });
    return this.taskRepository.save(task);
  }

  async getTasksFromProject(projectId: string) {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
    });
  }
}
