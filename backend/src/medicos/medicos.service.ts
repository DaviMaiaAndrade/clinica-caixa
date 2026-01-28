import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicosService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicoDto: CreateMedicoDto) {
    // Verificar se a especialidade existe
    const especialidade = await this.prisma.especialidade.findUnique({
      where: { id: createMedicoDto.especialidadeId },
    });

    if (!especialidade) {
      throw new BadRequestException('Especialidade não encontrada');
    }

    return this.prisma.medico.create({
      data: createMedicoDto,
      include: {
        especialidade: true,
      },
    });
  }

  async findAll() {
    return this.prisma.medico.findMany({
      where: { ativo: true },
      include: {
        especialidade: true,
        _count: {
          select: { consultas: true },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const medico = await this.prisma.medico.findUnique({
      where: { id },
      include: {
        especialidade: true,
        _count: {
          select: { consultas: true },
        },
      },
    });

    if (!medico) {
      throw new NotFoundException(`Médico com ID ${id} não encontrado`);
    }

    return medico;
  }

  async findByEspecialidade(especialidadeId: string) {
    return this.prisma.medico.findMany({
      where: {
        especialidadeId,
        ativo: true,
      },
      include: {
        especialidade: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    await this.findOne(id); // Verifica se existe

    // Se estiver mudando a especialidade, verificar se existe
    if (updateMedicoDto.especialidadeId) {
      const especialidade = await this.prisma.especialidade.findUnique({
        where: { id: updateMedicoDto.especialidadeId },
      });

      if (!especialidade) {
        throw new BadRequestException('Especialidade não encontrada');
      }
    }

    return this.prisma.medico.update({
      where: { id },
      data: updateMedicoDto,
      include: {
        especialidade: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica se existe

    // Soft delete
    return this.prisma.medico.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
