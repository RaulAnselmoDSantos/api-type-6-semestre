import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { TipoUsuario } from '../user.types';

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

  @IsOptional() // O tipo é opcional no momento da criação
  @IsEnum(TipoUsuario) // Valida que o valor corresponde a um dos definidos no enum
  tipo_usuario?: TipoUsuario;
}
