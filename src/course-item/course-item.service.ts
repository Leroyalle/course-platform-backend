import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseItemService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.lesson.findMany();
  }

  public async findOne(id: string) {
    const findLesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
        userProgress: true,
      },
    });

    if (!findLesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }

    const { userProgress, ...lessonWithoutProgress } = findLesson;
    const enhancedLesson = {
      ...lessonWithoutProgress,
      completed: userProgress.length > 0,
    };

    return enhancedLesson;
  }
}
