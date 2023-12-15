import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '사용자 로그인 API',
    description: '로그인을 진행한다.',
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthDto })
  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.signin(authDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
}
