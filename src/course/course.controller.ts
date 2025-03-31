import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { UserIdOptional } from 'src/user/decorators/userId-optional.decorator';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth-guard';

@UseGuards(OptionalAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(@UserIdOptional() userId?: string) {
    return this.courseService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserIdOptional() userId?: string) {
    return this.courseService.findOne(id, userId);
  }
}
