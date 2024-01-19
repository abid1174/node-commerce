import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginInputDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly password: string;
}
