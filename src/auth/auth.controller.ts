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
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

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
  isValidToken(@Request() req) {
    return this.authService.profile(req.user);
  }
}
