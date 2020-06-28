import { Module } from '@nestjs/common';
import { InstanceConfigService } from './instance-config.service';
import { InstanceConfigController } from './instance-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceConfigRepository } from './instance-config.repository';
import { InstanceConfig } from './instance-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceConfig, InstanceConfigRepository])],
  exports: [InstanceConfigService],
  providers: [InstanceConfigService],
  controllers: [InstanceConfigController]
})
export class InstanceConfigModule {}
