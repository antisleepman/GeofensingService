import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Point } from 'src/point/point.model';
import { PointModule } from 'src/point/point.module';
import { TransactionInterceptor } from 'src/utils/transaction.interceptor';
import { GeozoneController } from './geozone.controller';
import { Geozone } from './geozone.model';
import { GeozoneService } from './geozone.service';

@Module({
  controllers: [GeozoneController],
  providers: [
    GeozoneService
  ],
  imports:[
    SequelizeModule.forFeature([Geozone,Point]),
    PointModule
  ]
})
export class GeozoneModule {}

