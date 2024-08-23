import {
  MaxLength,
  IsOptional,
  IsString,
  IsUrl,
  IsEmail,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  nickname: string;

  @IsOptional()
  @IsUrl()
  picture: string;
}

export class ChangeUserPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  newPassword: string;

  @IsString()
  @MinLength(8)
  oldPassword: string;
}
