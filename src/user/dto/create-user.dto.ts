import { IsNotEmpty, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nome_usuario: string;

  @IsNotEmpty()
  cpf_usuario: string;

  @IsEmail()
  email_usuario: string;

  @IsNotEmpty()
  senha_usuario: string;

  @IsOptional()
  telefone_usuario?: string;

  @IsInt()
  @IsNotEmpty()
  tipo_usuario: number; // Exemplo: 1 = cliente, 2 = gerente
}
