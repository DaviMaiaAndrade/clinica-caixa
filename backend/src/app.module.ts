import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';

@Module({
  imports: [PrismaModule, EspecialidadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}