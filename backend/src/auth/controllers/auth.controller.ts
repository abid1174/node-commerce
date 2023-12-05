import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterInputDto } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerLocal(@Body() inputDto: RegisterInputDto) {
    const registeredUser = await this.authService.register(inputDto);
    return { data: registeredUser, meta: {} };
  }
}
