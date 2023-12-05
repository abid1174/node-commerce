import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserInputDto } from '../dtos/user-create-input.dto';
import { UserOutputDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(inputDto: CreateUserInputDto): Promise<UserOutputDto> {
    const user = plainToInstance(User, inputDto);

    user.password = await hash(inputDto.password, 10);

    await this.repository.save(user);

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
