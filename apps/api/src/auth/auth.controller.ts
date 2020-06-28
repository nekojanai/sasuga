import { Controller, Post, UseGuards, Body, Request, ClassSerializerInterceptor, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiTags, ApiCreatedResponse, ApiNotAcceptableResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { RegisterResponseDto } from './dto/register-response.dto';
import { tap } from 'rxjs/operators';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @ApiUnauthorizedResponse({ description: 'User doesn\'t exist or invalid credentials.' })
  @ApiCreatedResponse({ description: 'Successfully logged in, here\'s your token.', type: LoginResponseDto })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() _: LoginDto, @Request() req: any) {
    return req.user;
  }

  @ApiNotAcceptableResponse({ description: 'Registrations are disabled for this instance.' })
  @ApiCreatedResponse({ description: 'Successfully registered.', type: RegisterResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.registerIfEnabled(data);
  }

}
