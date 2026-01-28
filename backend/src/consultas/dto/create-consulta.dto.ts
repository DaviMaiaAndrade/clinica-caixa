import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt, IsUUID, Min, IsDateString } from 'class-validator';

export class CreateConsultaDto {
  @IsDateString()
  @IsNotEmpty()
  data: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantidade?: number;

  @IsUUID()
  @IsNotEmpty()
  especialidadeId: string;

  @IsUUID()
  @IsNotEmpty()
  medicoId: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valorDinheiro?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valorCartao?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valorPix?: number;

  @IsString()
  @IsOptional()
  observacao?: string;
}