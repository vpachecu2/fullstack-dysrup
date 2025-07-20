import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Task } from '../../task/task.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../project.entity';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let mockProjectRepo: any;
  let mockTaskRepo: any;

  const project = {
    id: '1',
    name: 'Test',
    description: 'desc',
    startDate: 'Fri Jul 18 2025',
  };

  const task = {
    id: '10',
    title: 'Task',
    description: '',
    dueDate: '2025-10-12',
    project,
  };

  beforeEach(async () => {
    mockProjectRepo = {
      create: jest.fn().mockReturnValue(project),
      save: jest.fn().mockResolvedValue(project),
      find: jest.fn().mockResolvedValue([project]),
      findOne: jest.fn().mockResolvedValue(project),
    };

    mockTaskRepo = {
      create: jest.fn().mockReturnValue(task),
      save: jest.fn().mockResolvedValue(task),
      find: jest.fn().mockResolvedValue([task]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepo,
        },
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepo,
        },
      ],
    }).compile();

    service = module.get(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const dto: CreateProjectDto = {
      name: 'Test',
      description: 'desc',
      startDate: 'Fri Jul 18 2025',
    };

    const result = await service.create(dto);

    expect(result).toEqual(project);
    expect(mockProjectRepo.create).toHaveBeenCalledWith(dto);
    expect(mockProjectRepo.save).toHaveBeenCalledWith(project);
  });

  it('should return all projects with tasks', async () => {
    const result = await service.findAll();

    expect(result).toEqual([project]);
    expect(mockProjectRepo.find).toHaveBeenCalledWith({ relations: ['tasks'] });
  });

  it('should add a task to a project', async () => {
    const dto: CreateTaskDto = { title: 'Task', description: '', dueDate: '2025-10-12' };

    const result = await service.addTaskToProject('1', dto);

    expect(mockProjectRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(mockTaskRepo.create).toHaveBeenCalledWith({ ...dto, project });
    expect(mockTaskRepo.save).toHaveBeenCalledWith(task);
    expect(result).toEqual(task);
  });

  it('should throw NotFoundException if project not found when adding task', async () => {
    mockProjectRepo.findOne.mockResolvedValue(null);

    const dto: CreateTaskDto = { title: 'Task', description: '', dueDate: '2025-10-12' };

    await expect(service.addTaskToProject('2', dto)).rejects.toThrow(NotFoundException);
  });

  it('should return tasks from a project', async () => {
    const result = await service.getTasksFromProject('1');

    expect(mockTaskRepo.find).toHaveBeenCalledWith({
      where: { project: { id: '1' } },
    });
    expect(result).toEqual([task]);
  });
});
