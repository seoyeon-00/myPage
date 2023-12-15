import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtToken: JwtService,
  ) {}

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('가입된 유저가 아닙니다.');
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('비밀번호를 확인해 주세요.');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.nickname,
    };

    const accessToken = await this.jwtToken.signAsync(payload);

    return {
      accessToken: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('가입된 유저가 아닙니다.');
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('비밀번호를 확인해 주세요.');
    }

    return user;
  }
}
