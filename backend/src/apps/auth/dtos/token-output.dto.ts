import { ROLES } from '@app/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenOutputDto {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}

export class UserAccessTokenClaimsDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  roles: ROLES[];
}

export class UserRefreshTokenClaimsDto {
  id: number;
}
