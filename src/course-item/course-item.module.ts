import { Module } from '@nestjs/common';
import { CourseItemService } from './course-item.service';
import { CourseItemController } from './course-item.controller';

@Module({
  controllers: [CourseItemController],
  providers: [CourseItemService],
})
export class CourseItemModule {}
