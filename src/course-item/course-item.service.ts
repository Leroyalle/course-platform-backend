import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseItemService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.lesson.findMany();
  }

  findOne(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });
  }
}
