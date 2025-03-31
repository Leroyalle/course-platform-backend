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

  update(id: number) {
    return `This action updates a #${id} userProgress`;
  }
}
