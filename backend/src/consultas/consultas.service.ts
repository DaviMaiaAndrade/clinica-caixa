import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultasService {
  constructor(private prisma: PrismaService) {}

  private calcularValores(
    valorDinheiro: number,
    valorCartao: number,
    valorPix: number,
    percentualMedico: number,
  ) {
    const valorTotal = valorDinheiro + valorCartao + valorPix;
    const valorMedico = (valorTotal * percentualMedico) / 100;
    const valorClinica = valorTotal - valorMedico;

    return {
      valorTotal,
      valorMedico,
      valorClinica,
    };
  }

  async create(createConsultaDto: CreateConsultaDto) {
    // Verificar se médico existe
    const medico = await this.prisma.medico.findUnique({
      where: { id: createConsultaDto.medicoId },
      include: { especialidade: true },
    });

    if (!medico) {
      throw new BadRequestException('Médico não encontrado');
    }

    // Verificar se especialidade existe
    const especialidade = await this.prisma.especialidade.findUnique({
      where: { id: createConsultaDto.especialidadeId },
    });

    if (!especialidade) {
      throw new BadRequestException('Especialidade não encontrada');
    }

    // Calcular valores
    const valorDinheiro = createConsultaDto.valorDinheiro || 0;
    const valorCartao = createConsultaDto.valorCartao || 0;
    const valorPix = createConsultaDto.valorPix || 0;

    const { valorTotal, valorMedico, valorClinica } = this.calcularValores(
      valorDinheiro,
      valorCartao,
      valorPix,
      medico.percentual,
    );

    // Criar consulta
    return this.prisma.consulta.create({
      data: {
        data: new Date(createConsultaDto.data),
        quantidade: createConsultaDto.quantidade || 1,
        especialidadeId: createConsultaDto.especialidadeId,
        medicoId: createConsultaDto.medicoId,
        valorDinheiro,
        valorCartao,
        valorPix,
        valorTotal,
        valorMedico,
        valorClinica,
        observacao: createConsultaDto.observacao,
      },
      include: {
        medico: true,
        especialidade: true,
      },
    });
  }

  async findAll(startDate?: string, endDate?: string, medicoId?: string, especialidadeId?: string) {
    const where: any = {};

    if (startDate && endDate) {
      where.data = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (medicoId) {
      where.medicoId = medicoId;
    }

    if (especialidadeId) {
      where.especialidadeId = especialidadeId;
    }

    return this.prisma.consulta.findMany({
      where,
      include: {
        medico: true,
        especialidade: true,
      },
      orderBy: { data: 'desc' },
    });
  }

  async findOne(id: string) {
    const consulta = await this.prisma.consulta.findUnique({
      where: { id },
      include: {
        medico: {
          include: {
            especialidade: true,
          },
        },
        especialidade: true,
      },
    });

    if (!consulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }

    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {
    const consultaExistente = await this.findOne(id);

    // Se estiver mudando valores, recalcular
    let dadosAtualizados: any = { ...updateConsultaDto };

    if (
      updateConsultaDto.valorDinheiro !== undefined ||
      updateConsultaDto.valorCartao !== undefined ||
      updateConsultaDto.valorPix !== undefined ||
      updateConsultaDto.medicoId
    ) {
      // Buscar médico (pode ser o novo ou o existente)
      const medicoId = updateConsultaDto.medicoId || consultaExistente.medicoId;
      const medico = await this.prisma.medico.findUnique({
        where: { id: medicoId },
      });

      if (!medico) {
        throw new BadRequestException('Médico não encontrado');
      }

      const valorDinheiro = updateConsultaDto.valorDinheiro ?? consultaExistente.valorDinheiro;
      const valorCartao = updateConsultaDto.valorCartao ?? consultaExistente.valorCartao;
      const valorPix = updateConsultaDto.valorPix ?? consultaExistente.valorPix;

      const { valorTotal, valorMedico, valorClinica } = this.calcularValores(
        valorDinheiro,
        valorCartao,
        valorPix,
        medico.percentual,
      );

      dadosAtualizados = {
        ...dadosAtualizados,
        valorDinheiro,
        valorCartao,
        valorPix,
        valorTotal,
        valorMedico,
        valorClinica,
      };
    }

    if (updateConsultaDto.data) {
      dadosAtualizados.data = new Date(updateConsultaDto.data);
    }

    return this.prisma.consulta.update({
      where: { id },
      data: dadosAtualizados,
      include: {
        medico: true,
        especialidade: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.consulta.delete({
      where: { id },
    });
  }

  async getTotaisPorPeriodo(startDate: string, endDate: string) {
    const consultas = await this.prisma.consulta.findMany({
      where: {
        data: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const totais = consultas.reduce(
      (acc, consulta) => {
        acc.valorTotal += consulta.valorTotal;
        acc.valorDinheiro += consulta.valorDinheiro;
        acc.valorCartao += consulta.valorCartao;
        acc.valorPix += consulta.valorPix;
        acc.valorMedico += consulta.valorMedico;
        acc.valorClinica += consulta.valorClinica;
        acc.quantidade += consulta.quantidade;
        return acc;
      },
      {
        valorTotal: 0,
        valorDinheiro: 0,
        valorCartao: 0,
        valorPix: 0,
        valorMedico: 0,
        valorClinica: 0,
        quantidade: 0,
      },
    );

    return totais;
  }
}