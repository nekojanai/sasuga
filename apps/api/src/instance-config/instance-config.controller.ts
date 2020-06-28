import { Controller, Get, Patch, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InstanceConfigService } from './instance-config.service';
import { UpdateInstanceConfigDto } from './dto/update-instance-config.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { InstanceConfig } from './instance-config.entity';

@ApiTags('config')
@Controller('api/v1/config')
export class InstanceConfigController {

  constructor(
    public instanceConfigService: InstanceConfigService
  ) {}

  @ApiOkResponse({ type: InstanceConfig })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  get() {
    return this.instanceConfigService.getOrCreate();
  }

  @ApiOkResponse({ type: InstanceConfig })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  update(@Body() data: UpdateInstanceConfigDto) {
    console.log(data);
    return this.instanceConfigService.updateOrCreate(data);
  }

}
