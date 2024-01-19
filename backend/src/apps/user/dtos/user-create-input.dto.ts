import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty()
  @MaxLength(100)
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  readonly password: string;
}
