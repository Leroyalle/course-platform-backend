import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll(userId?: string) {
    const courses = await this.prisma.course.findMany({
      include: {
        lessons: {
          include: {
            userProgress: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    const enhancedCourses = courses.map((course) => {
      const lessons = course.lessons.map((lesson) => {
        const { userProgress, ...lessonWithoutProgress } = lesson;
        return {
          ...lessonWithoutProgress,
          completed: userProgress.length > 0,
        };
      });

      return { ...course, lessons };
    });

    return enhancedCourses;
  }

  public async findOne(id: string, userId?: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          include: {
            userProgress: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    const { lessons, ...courseWithoutLessons } = course;

    const enhancedLessons = lessons.map((lesson) => {
      const { userProgress, ...lessonWithoutProgress } = lesson;
      return {
        ...lessonWithoutProgress,
        completed: userProgress.length > 0,
      };
    });

    return {
      ...courseWithoutLessons,
      lessons: enhancedLessons,
    };
  }
}
