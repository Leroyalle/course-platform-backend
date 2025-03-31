import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProgressService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(id: string, userId: string) {
    const completedLessons = await this.prisma.userProgress.findMany({
      where: { courseId: id, userId },
    });

    return completedLessons.map((lesson) => lesson.lessonId);
  }

  public async update(courseId: string, lessonId: string, userId: string) {
    const progress = await this.prisma.userProgress.findFirst({
      where: { courseId, lessonId, userId },
    });

    if (progress) {
      return await this.prisma.userProgress.delete({
        where: { id: progress.id },
      });
    }

    return await this.prisma.userProgress.create({
      data: { courseId, lessonId, userId },
    });
  }
}
