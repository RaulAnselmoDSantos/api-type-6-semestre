import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email_usuario: string;

  @IsNotEmpty()
  senha_usuario: string;
}
