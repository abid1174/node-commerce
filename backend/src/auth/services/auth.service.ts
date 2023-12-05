import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RegisterInputDto, RegisterOutputDto } from '../dtos';
import { UserService } from '@app/user/services';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(inputDto: RegisterInputDto): Promise<RegisterOutputDto> {
    const registeredUser = await this.userService.createUser(inputDto);
    return plainToInstance(RegisterOutputDto, registeredUser, {
      excludeExtraneousValues: true,
    });
  }
}
