import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    return user;
  }
}
