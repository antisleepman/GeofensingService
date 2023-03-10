import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Geozone } from 'src/geozone/geozone.model';
import { Point } from './point.model';
import { PointService } from './point.service';

@Module({
  providers: [PointService],
  imports: [SequelizeModule.forFeature([Point, Geozone])],
  exports:[PointService]
})
export class PointModule {}
