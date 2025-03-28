import { Controller, Get, Param } from '@nestjs/common';
import { CourseItemService } from './course-item.service';

@Controller('course-item')
export class CourseItemController {
  constructor(private readonly courseItemService: CourseItemService) {}

  @Get()
  findAll() {
    return this.courseItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseItemService.findOne(id);
  }
}
