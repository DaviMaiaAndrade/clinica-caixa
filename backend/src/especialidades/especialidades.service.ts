import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Injectable()
export class EspecialidadesService {
  constructor(private prisma: PrismaService) {}

  async create(createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.prisma.especialidade.create({
      data: createEspecialidadeDto,
    });
  }

  async findAll() {
    return this.prisma.especialidade.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const especialidade = await this.prisma.especialidade.findUnique({
      where: { id },
      include: {
        _count: {
          select: { consultas: true, medicos: true },
        },
      },
    });

    if (!especialidade) {
      throw new NotFoundException(`Especialidade com ID ${id} não encontrada`);
    }

    return especialidade;
  }

  async update(id: string, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.especialidade.update({
      where: { id },
      data: updateEspecialidadeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica se existe

    // Soft delete
    return this.prisma.especialidade.update({
      where: { id },
      data: { ativo: false },
    });
  }
}