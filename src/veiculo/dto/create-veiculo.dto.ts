import { IsNotEmpty, IsOptional, IsString, IsNumber, Matches } from 'class-validator';

export class CreateVeiculoDto {
  @IsNotEmpty()
  @IsString()
  veiculo_marca: string;

  @IsNotEmpty()
  @IsString()
  veiculo_modelo: string;

  @IsOptional()
  @IsString()
  veiculo_cor?: string;

  @IsOptional()
  @Matches(/^[A-Z]{3}[0-9]{1}[A-Z]\d{1}$/, { message: 'Placa deve estar no formato ABC1A23' }) 
  @IsString()
  veiculo_placa?: string;

  @IsOptional()
  @IsString()
  veiculo_motor?: string;

  @IsOptional()
  @IsNumber()
  veiculo_km?: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number; // Relaciona o veículo ao usuário
}
