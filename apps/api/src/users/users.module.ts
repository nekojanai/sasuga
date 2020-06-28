import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
