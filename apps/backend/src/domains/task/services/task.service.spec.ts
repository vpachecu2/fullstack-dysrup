import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: jest.Mocked<any>;

  const mockTask = { id: '123', done: false, deletedAt: null };

  beforeEach(async () => {
    taskRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: taskRepository,
        },
      ],
    }).compile();

    service = module.get(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('markAsDone', () => {
    it('should mark a task as done', async () => {
      taskRepository.findOne.mockResolvedValue({ ...mockTask });
      taskRepository.save.mockImplementation((val) => Promise.resolve(val));

      const result = await service.markAsDone('123');

      expect(result.done).toBe(true);
      expect(taskRepository.save).toHaveBeenCalledWith(expect.objectContaining({ done: true }));
    });

    it('should throw if task not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      await expect(service.markAsDone('404')).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should set deletedAt as string date', async () => {
      taskRepository.findOne.mockResolvedValue({ ...mockTask });
      taskRepository.save.mockImplementation((val) => Promise.resolve(val));

      const result = await service.softDelete('123');

      expect(typeof result.deletedAt).toBe('string');
      expect(taskRepository.save).toHaveBeenCalledWith(expect.objectContaining({ deletedAt: expect.any(String) }));
    });

    it('should throw if task not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      await expect(service.softDelete('404')).rejects.toThrow(NotFoundException);
    });
  });
});
