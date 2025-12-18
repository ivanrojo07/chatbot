import { Transform } from 'class-transformer';
import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  usernameOrEmail: string;
  @Transform(({ value }) => value.trim())
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
