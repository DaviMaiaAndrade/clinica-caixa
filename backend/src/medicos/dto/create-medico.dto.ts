import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsUUID, Min, Max } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsUUID()
  @IsNotEmpty()
  especialidadeId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentual?: number;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
