import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserInputDto } from '../dtos/user-create-input.dto';
import { UserOutputDto } from '../dtos';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User } from '../entities';
import { compare, hash } from 'bcrypt';
import { RequestContextDto } from '@app/shared/request-context';
import { AppLogger } from '@app/shared/logger';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }

  async createUser(inputDto: CreateUserInputDto): Promise<UserOutputDto> {
    const user = plainToInstance(User, inputDto);

    user.password = await hash(inputDto.password, 10);

    await this.repository.save(user);

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async validateUsernamePassword(
    ctx: RequestContextDto,
    username: string,
    pass: string,
  ): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.validateUsernamePassword.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException();

    return plainToClass(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
