import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(3, 255)
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}
