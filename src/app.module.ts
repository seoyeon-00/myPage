import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserEntity } from './user/entities/user.entitiy';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/entities/contact.entitiy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'myapp',
      //entities: [`${__dirname}/**/entities/*.entity.{ts,js}`],
      entities: [UserEntity, ContactEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
