import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseItemService } from './course-item.service';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth-guard';
import { UserIdOptional } from 'src/user/decorators/userId-optional.decorator';

@UseGuards(OptionalAuthGuard)
@Controller('lesson')
export class CourseItemController {
  constructor(private readonly courseItemService: CourseItemService) {}

  @Get()
  findAll() {
    return this.courseItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserIdOptional() userId?: string) {
    return this.courseItemService.findOne(id, userId);
  }
}
