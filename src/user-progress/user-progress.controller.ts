import { Controller, Get, Patch, Param } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserId } from 'src/user/decorators/userId.decorator';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.userProgressService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userProgressService.update(+id);
  }
}
