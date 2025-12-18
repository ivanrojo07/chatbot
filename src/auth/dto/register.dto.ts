import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @Transform(({ value }) => value.trim())
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
