import { Controller, Get, Patch, Body, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { InstanceConfigService } from './instance-config.service';
import { UpdateInstanceConfigDto } from './dto/update-instance-config.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InstanceConfig } from './instance-config.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-admin'))
  @ApiOkResponse({ type: InstanceConfig })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  update(@Body() data: UpdateInstanceConfigDto) {
    console.log(data);
    return this.instanceConfigService.updateOrCreate(data);
  }

}
