import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

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
