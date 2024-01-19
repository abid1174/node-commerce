import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterInputDto } from '../dtos';
import { ReqContext, RequestContextDto } from '@app/shared/request-context';
import { AppLogger } from '@app/shared/logger';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('login')
  async login(@ReqContext() ctx: RequestContextDto) {
    this.logger.log(ctx, `${this.login.name} was called`);

    const authToken = this.authService.login(ctx);
    return { data: authToken, meta: {} };
  }

  @Post('register')
  async registerLocal(
    @ReqContext() ctx: RequestContextDto,
    @Body() inputDto: RegisterInputDto,
  ) {
    const registeredUser = await this.authService.register(ctx, inputDto);
    return { data: registeredUser, meta: {} };
  }
}
