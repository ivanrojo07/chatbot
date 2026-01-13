import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateSociodemographicInfoDto {
  @IsNumber()
  age: number;
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
  @IsNumber()
  alcaldiaId: number;
  @IsString()
  chatId: string;
}
