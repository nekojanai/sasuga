import { Module } from '@nestjs/common';
import { UploadsModule } from '../uploads/uploads.module';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    UsersModule,
    UploadsModule
  ],
  controllers: [ProfileController]
})
export class ProfileModule {}
