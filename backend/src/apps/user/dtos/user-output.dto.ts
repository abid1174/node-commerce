import { ROLES } from '@app/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose()
  @ApiProperty()
  readonly id: number;

  @Expose()
  @ApiProperty()
  readonly username: string;

  @Expose()
  @ApiProperty()
  readonly first_name: string;

  @Expose()
  @ApiProperty()
  readonly last_name: string;

  @Expose()
  @ApiProperty({ example: [ROLES.USER] })
  readonly roles: ROLES[];

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  readonly isAccountDisabled: boolean;

  @Expose()
  @ApiProperty()
  readonly createdAt: string;

  @Expose()
  @ApiProperty()
  readonly updatedAt: string;
}
