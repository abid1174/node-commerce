import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterOutputDto {
  @Expose()
  @ApiProperty()
  readonly id: number;

  @Expose()
  @ApiProperty()
  readonly first_name: string;

  @Expose()
  @ApiProperty()
  readonly last_name: string;

  @Expose()
  @ApiProperty()
  readonly username: string;

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  readonly createdAt: string;

  @Expose()
  @ApiProperty()
  readonly updatedAt: string;

  @Expose()
  @ApiProperty()
  readonly isAccountDisabled: boolean;
}
