import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('medicoId') medicoId?: string,
    @Query('especialidadeId') especialidadeId?: string,
  ) {
    return this.consultasService.findAll(startDate, endDate, medicoId, especialidadeId);
  }

  @Get('totais')
  getTotais(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.consultasService.getTotaisPorPeriodo(startDate, endDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultasService.update(id, updateConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(id);
  }
}