import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/utils/transaction.interceptor';
import { CreatePointDto } from './dto/create-point.dto';
import { DeletePointDto } from './dto/delete-point.dto';
import { FindPointDto } from './dto/find-point.dto';
import { Point } from './point.model';

@Injectable()
export class PointService {
    constructor(@InjectModel (Point) private pointRepository: typeof Point){}
    async BulkCreate(dto: CreatePointDto[]){
        const points = await this.pointRepository.bulkCreate(dto)
        const ArrIdPoints = []
        points.map((point)=> ArrIdPoints.push(point.dataValues))
        console.log("points ",points)
        return ArrIdPoints
    }

    async CreatePoint(dto: CreatePointDto){
        const point = await this.pointRepository.create(dto)
        return point
    }
    

    async FindPoint(dto:FindPointDto){
        const point = await this.pointRepository.findOne({where:{id: dto.id}})
        return point
    }

    async DeletePoint(dto:DeletePointDto){
        const point = await this.pointRepository.destroy({where:{id: dto.id}})
        return point
    }
    async DeletePointByGeozoneId(id:number){
        const point = await this.pointRepository.destroy({where:{geozoneId: id }})
        return point
    }
    async FindPoints(dto:FindPointDto){
        const points = await this.pointRepository.findAll({where:{geozoneId:dto.id}})
        return points
    }
}


