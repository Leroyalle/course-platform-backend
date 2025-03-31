import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserId } from 'src/user/decorators/userId.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.userProgressService.findOne(id, userId);
  }

  @Patch(':courseId/lessons/:lessonId')
  update(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @UserId() userId: string,
  ) {
    return this.userProgressService.update(courseId, lessonId, userId);
  }
}
