import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PublicUsersController } from './public-users.controller';
import { ActivityPubService } from './activity-pub.service';
import { RemoteInstance } from './remote-instance.entity';
import { RemoteActor } from './remote-actor.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository,RemoteInstance,RemoteActor]),
		HttpModule
	],
	exports: [UsersService],
	controllers: [UsersController, PublicUsersController],
	providers: [
		UsersService,
		ActivityPubService
	],
})
export class UsersModule {}
