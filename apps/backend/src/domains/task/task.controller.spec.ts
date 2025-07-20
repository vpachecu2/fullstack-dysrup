import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './services/task.service';
import { TaskController } from './task.controller';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockService = {
    softDelete: jest.fn().mockResolvedValue({ id: '1', deletedAt: new Date() }),
    markAsDone: jest.fn().mockResolvedValue({ id: '1', completedAt: new Date() }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should mark task as done', async () => {
    const result = await controller.markDone('1');
    expect(mockService.markAsDone).toHaveBeenCalledWith('1');
    expect(result).toBeDefined();
  });

  it('should soft delete task', async () => {
    const result = await controller.softDelete('1');
    expect(mockService.softDelete).toHaveBeenCalledWith('1');
    expect(result).toBeDefined();
  });
});
