// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { UserService } from '@app/apps/user/services';
// import { RequestContextDto } from '@app/shared/request-context';
// import { LocalStrategy } from '../strategies';

// describe('AuthService', () => {
//   let authService: AuthService;
//   let userService: UserService;

//   const _mockUser = {
//     id: '93a002cf-42e3-42b0-9963-8078e609cbbc',
//     name: 'abid',
//     email: 'abid@gmail.com',
//     createdAt: '2023-12-05 13:06:39.946437',
//     updatedAt: '2023-12-05 13:06:39.946437',
//   };

//   const mockedUserService = {
//     createUser: jest.fn().mockResolvedValue(_mockUser),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         LocalStrategy,
//         { provide: UserService, useValue: mockedUserService },
//       ],
//     }).compile();

//     authService = module.get<AuthService>(AuthService);
//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(authService).toBeDefined();
//   });

//   describe('register', () => {
//     const registerInputDto = {
//       first_name: 'abid',
//       last_name: 'al-amin',
//       username: 'abid1174',
//       email: 'abid@gmail.com',
//       password: '123456',
//     };

//     it('should create a new user', async () => {
//       const res = await authService.register(
//         {} as RequestContextDto,
//         registerInputDto,
//       );
//       expect(userService.createUser).toHaveBeenCalledWith(registerInputDto);
//       expect(res).toEqual(_mockUser);
//     });
//   });
// });
