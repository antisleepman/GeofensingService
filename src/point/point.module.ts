import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Geozone } from 'src/geozone/geozone.model';
import { TransactionInterceptor } from 'src/utils/transaction.interceptor';
import { Point } from './point.model';
import { PointService } from './point.service';

@Module({
  providers: [PointService],
  imports: [SequelizeModule.forFeature([Point, Geozone])],
  exports: [PointService]
})
export class PointModule { }
