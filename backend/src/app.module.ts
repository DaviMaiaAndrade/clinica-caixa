import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';

@Module({
  imports: [PrismaModule, EspecialidadesModule, MedicosModule, ConsultasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
