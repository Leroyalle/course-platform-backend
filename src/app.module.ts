import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CourseModule } from './course/course.module';
import { CourseItemModule } from './course-item/course-item.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    CourseModule,
    CourseItemModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
