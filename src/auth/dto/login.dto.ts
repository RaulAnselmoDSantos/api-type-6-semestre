import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email_usuario: string;

  @IsString()
  @IsNotEmpty()
  senha_usuario: string;
}
