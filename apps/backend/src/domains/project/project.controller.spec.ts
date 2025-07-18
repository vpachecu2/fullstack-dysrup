import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectController } from './project.controller';
import { ProjectService } from './services/project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockService = {
    create: jest.fn().mockResolvedValue({ id: '1', name: 'Test' }),
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Test' }]),
    addTaskToProject: jest.fn().mockResolvedValue({ id: '10', title: 'Task' }),
    getTasksFromProject: jest.fn().mockResolvedValue([{ id: '10', title: 'Task' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{ provide: ProjectService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a project', async () => {
    const dto: CreateProjectDto = {
      name: 'Test',
      description: '',
      startDate: new Date().toDateString(),
    };
    const result = await controller.createProject(dto);
    expect(result).toEqual({ id: '1', name: 'Test' });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should list all projects', async () => {
    const result = await controller.findAllProjects();
    expect(result).toEqual([{ id: '1', name: 'Test' }]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should add a task to a project', async () => {
    const dto: CreateTaskDto = { title: 'Task', description: '', dueDate: '2025-10-12' };
    const projectId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await controller.addTask(projectId, dto);
    expect(result).toEqual({ id: '10', title: 'Task' });
    expect(mockService.addTaskToProject).toHaveBeenCalledWith(projectId, dto);
  });

  it('should get tasks from a project', async () => {
    const projectId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await controller.getTasks(projectId);
    expect(result).toEqual([{ id: '10', title: 'Task' }]);
    expect(mockService.getTasksFromProject).toHaveBeenCalledWith(projectId);
  });
});
