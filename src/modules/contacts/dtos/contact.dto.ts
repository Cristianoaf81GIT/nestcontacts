import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ContactDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
