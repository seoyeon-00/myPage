import { Module } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
