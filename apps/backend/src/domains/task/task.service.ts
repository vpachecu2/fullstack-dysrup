import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) { }

  async markAsDone(taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');

    task.done = true;
    return this.taskRepository.save(task);
  }

  async softDelete(taskId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');

    task.deletedAt = new Date().toDateString();
    return this.taskRepository.save(task);
  }
}
