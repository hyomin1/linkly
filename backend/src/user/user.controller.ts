import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { UserResponseDto } from './dto/user-response.dto';
import { RequestUser } from './types/request-user';

@Controller('user')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: Request): UserResponseDto {
    const user = req.user as RequestUser;
    const { id, name, picture } = user;
    return { id, name, picture };
  }
}
