import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '이메일, 닉네임 등을 조회한다.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: any) {
    const userId = req.user.id;
    return await this.userService.getUserById(userId);
  }
}
