import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { STRATEGY_LOCAL } from '../constants';
import { AuthService } from '../services';
import { UserAccessTokenClaimsDto } from '../dtos';
import { createRequestContext } from '@app/shared/request-context';
import { AppLogger } from '@app/shared/logger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
  constructor(
    private readonly logger: AppLogger,
    private authService: AuthService,
  ) {
    // Add option passReqToCallback: true to configure strategy to be request-scoped.
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
    this.logger.setContext(LocalStrategy.name);
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<UserAccessTokenClaimsDto> {
    //TODO: Fix any here
    const ctx = createRequestContext(request as any);

    this.logger.log(ctx, `${this.validate.name} was called`);

    const user = await this.authService.validateUser(ctx, username, password);
    // Passport automatically creates a user object, based on the value we return from the validate() method,
    // and assigns it to the Request object as req.user
    return user;
  }
}
