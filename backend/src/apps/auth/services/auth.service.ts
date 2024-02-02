import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  RegisterInputDto,
  RegisterOutputDto,
  TokenOutputDto,
  UserAccessTokenClaimsDto,
} from '../dtos';
import { UserService } from '@app/apps/user/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from '@app/shared/logger';
import { RequestContextDto } from '@app/shared/request-context';
import { UserOutputDto } from '@app/apps/user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: AppLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  login(ctx: RequestContextDto): TokenOutputDto {
    this.logger.log(ctx, `${this.login.name} was called`);

    return this.getAuthToken(ctx, ctx.user);
  }

  async register(
    ctx: RequestContextDto,
    inputDto: RegisterInputDto,
  ): Promise<RegisterOutputDto> {
    this.logger.log(ctx, `${this.register.name} was called`);

    const registeredUser = await this.userService.createUser(inputDto);
    return plainToInstance(RegisterOutputDto, registeredUser, {
      excludeExtraneousValues: true,
    });
  }

  getAuthToken(
    ctx: RequestContextDto,
    user: UserAccessTokenClaimsDto | UserOutputDto,
  ): TokenOutputDto {
    this.logger.log(ctx, `${this.getAuthToken.name} was called`);

    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get('jwt.refreshTokenExpiresInSec'),
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: this.configService.get('jwt.accessTokenExpiresInSec') },
      ),
    };
    return plainToInstance(TokenOutputDto, authToken, {
      excludeExtraneousValues: true,
    });
  }

  async validateUser(
    ctx: RequestContextDto,
    username: string,
    pass: string,
  ): Promise<UserAccessTokenClaimsDto> {
    this.logger.log(ctx, `${this.validateUser.name} was called`);

    // The userService will throw Unauthorized in case of invalid username/password.
    const user = await this.userService.validateUsernamePassword(
      ctx,
      username,
      pass,
    );

    // Prevent disabled users from logging in.
    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }
}
