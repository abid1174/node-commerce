import { ROLES } from '@app/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenOutputDto {
  @Expose()
  @ApiProperty()
  readonly accessToken: string;

  @Expose()
  @ApiProperty()
  readonly refreshToken: string;
}

export class UserAccessTokenClaimsDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly roles: ROLES[];
}

export class UserRefreshTokenClaimsDto {
  readonly id: number;
}
