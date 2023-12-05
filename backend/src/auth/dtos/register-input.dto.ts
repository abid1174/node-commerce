import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;
}
