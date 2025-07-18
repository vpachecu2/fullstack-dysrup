import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Put
} from '@nestjs/common';
import { TaskService } from './services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Patch(':id')
  markDone(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.markAsDone(id);
  }

  @Put(':id/delete')
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.softDelete(id);
  }
}
