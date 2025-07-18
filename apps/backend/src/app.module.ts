import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Project } from './domains/project/project.entity';
import { ProjectModule } from './domains/project/project.module';
import { Task } from './domains/task/task.entity';
import { TaskModule } from './domains/task/task.module';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // garante acesso em todo o app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Project, Task]),
    ProjectModule,
    TaskModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
