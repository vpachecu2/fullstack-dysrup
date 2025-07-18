import { Controller, Delete, Param, Patch } from '@nestjs/common';

@Controller('task')
export class TaskController {
  @Patch(':taskId')
  markTaskAsDone(@Param('taskId') taskId: string) {
    return { message: `Task ${taskId} marked as done` };
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return { message: `Task ${taskId} deleted` };
  }
}
