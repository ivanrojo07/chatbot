import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    const user = this.authService.login(loginDto);
    return user;
    // return this.authService.login();
  }
  @Get('/profile')
  @Auth(Role.USER)
  isValidToken(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
