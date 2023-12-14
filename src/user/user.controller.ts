import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/user.signup.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '사용자 생성 API',
    description: '사용자를 생성한다.',
  })
  @ApiBody({ type: SignupDto })
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    const { email, password, nickname } = signupDto;
    const hashPassword = await this.userService.hashPassword(password);

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const hasNickname = await this.userService.findByNickname(nickname);
    if (hasNickname) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    signupDto.password = hashPassword;

    await this.userService.create(signupDto);
    return '회원가입성공';
  }
}
