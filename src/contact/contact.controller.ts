import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Contact API')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @ApiOperation({
    summary: '문의 요청 API',
    description: '문의 데이터 요청',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllContacts() {
    return await this.contactService.findAll();
  }

  @ApiOperation({
    summary: '문의 생성 API',
    description: '문의 데이터베이스 생성',
  })
  @ApiBody({ type: ContactDto })
  @Post('/create')
  async createContact(@Body() contactDto: ContactDto) {
    return await this.contactService.create(contactDto);
  }

  @ApiOperation({
    summary: '문의 삭제 API',
    description: '문의 데이터베이스 삭제',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteContact(@Param('id') id: string) {
    return await this.contactService.delete(id);
  }
}
