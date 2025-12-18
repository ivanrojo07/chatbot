import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findAll() {
    return this.userRepository.find();
  }

  hashPassword(password: string): Promise<string> {
    // Implement your password hashing logic here
    return Promise.resolve(bcryptjs.hash(password, 10)); // Placeholder implementation
  }

  validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Implement your password validation logic here
    return Promise.resolve(bcryptjs.compare(plainPassword, hashedPassword)); // Placeholder implementation
  }
}
