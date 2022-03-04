import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(3, 255)
  @ApiProperty()
  fullName: string;
  
  @IsEmail()
  @ApiProperty()
  email: string;
  
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
