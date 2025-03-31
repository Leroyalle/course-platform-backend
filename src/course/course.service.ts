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
            userProgress: userId
              ? {
                  where: {
                    userId: userId,
                  },
                }
              : false,
          },
        },
      },
    });

    const enhancedCourses = courses.map((course) => {
      const lessons = course.lessons.map((lesson) => {
        const { userProgress, ...lessonWithoutProgress } = lesson;
        return {
          ...lessonWithoutProgress,
          completed: userProgress ? userProgress?.length > 0 : false,
        };
      });

      return { ...course, lessons };
    });

    return enhancedCourses;
  }

  public async findOne(id: string, userId?: string) {
    console.log('userId', userId);
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          include: {
            userProgress: userId
              ? {
                  where: {
                    userId: userId,
                  },
                }
              : false,
          },
        },
      },
    });
    console.log(
      'Found userProgress:',
      JSON.stringify(
        course?.lessons.map((l) => l.userProgress),
        null,
        2,
      ),
    );
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    const { lessons, ...courseWithoutLessons } = course;

    const enhancedLessons = lessons.map((lesson) => {
      const { userProgress, ...lessonWithoutProgress } = lesson;

      return {
        ...lessonWithoutProgress,
        completed: userProgress ? userProgress?.length > 0 : false,
      };
    });

    return {
      ...courseWithoutLessons,
      lessons: enhancedLessons,
    };
  }
}
