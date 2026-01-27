import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}