import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const existingUserByEmail = await this.usersService.findOneByEmail(
      registerDto.email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException('User with this email already exists');
    }
    const existingUserByUsername = await this.usersService.findOneByUsername(
      registerDto.username,
    );
    if (existingUserByUsername) {
      throw new BadRequestException('User with this username already exists');
    }
    return await this.usersService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: await this.usersService.hashPassword(registerDto.password),
    });
  }
  async login(loginDto: LoginDto) {
    const is_email = loginDto.usernameOrEmail.includes('@');
    let user;
    if (is_email) {
      user = await this.usersService.findOneByEmail(loginDto.usernameOrEmail);
    } else {
      user = await this.usersService.findOneByUsername(
        loginDto.usernameOrEmail,
      );
    }

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    // validate password
    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      ...user,
      password: undefined,
      id: undefined,
      deletedAt: undefined,
    };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'Login successful', token };
  }
}
