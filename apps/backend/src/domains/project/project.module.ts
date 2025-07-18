import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { TaskModule } from '../task/task.module';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './services/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task]), TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule { }
