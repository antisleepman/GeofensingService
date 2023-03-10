import { BadRequestException, Injectable, InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Transaction } from 'sequelize';
import { PointService } from 'src/point/point.service';
import { TransactionParam } from 'src/utils/ParamsTransaction';
import { TransactionInterceptor } from 'src/utils/transaction.interceptor';
import { CreateGeozoneDto } from './dto/create-geozone.dto';
import { EditGeozoneDto } from './dto/edit-geozone.dto';
import { GetOneGeozoneDto } from './dto/getone-geozone.dto';
import { Geozone } from './geozone.model';

@Injectable()
export class GeozoneService {
    constructor(@InjectModel(Geozone)
    private geozoneRepository: typeof Geozone,
        private pointService: PointService) { }

    async CreateGeozone(dto: CreateGeozoneDto) {
        if (dto.points.length < 3) throw new BadRequestException('need 3+ points for create')
        if (await this.geozoneRepository.findOne({ where: { name: dto.name } })) throw new BadRequestException(
            "name already exist")
        const geozone = await this.geozoneRepository.create({ name: dto.name }, { include: { all: true } })
        const geozoneId = geozone.id
        const points = await this.pointService.BulkCreate(dto.points.map((point) => ({ ...point, geozoneId })))
        geozone.update({ points: points })
        return geozone
    }

    async EditGeozone(dto: EditGeozoneDto) {
        if (!dto.id || (!dto.points && !dto.name)) throw new BadRequestException('null value')

        const geozone = await this.geozoneRepository.findOne({ where: { id: dto.id }, include: { all: true } })
        if (!geozone) throw new BadRequestException('incorrect ID')
        if (!dto.name && dto.name != geozone.name) geozone.update({ name: dto.name })
        if (!dto.points && dto.points != geozone.points) { //TODO make transaction
            await this.pointService.DeletePointByGeozoneId(dto.id)
            await this.pointService.BulkCreate(dto.points)
        }
        return await this.geozoneRepository.findOne({ where: { id: dto.id }, include: { all: true } })
    }

    async GetAllGeozones() {
        return await this.geozoneRepository.findAll({ include: { all: true } })
    }

    async GetOneGeozone(dto: GetOneGeozoneDto) {
        const geozone = await this.geozoneRepository.findOne({ where: { id: dto.id }, include: { all: true } })
        if (geozone) return geozone
        throw new BadRequestException("No geozone with this id")
    }

    async DeleteGeozone(dto: GetOneGeozoneDto) {
        await this.pointService.DeletePointByGeozoneId(dto.id)
        const geozone = await this.geozoneRepository.destroy({ where: { id: dto.id } })
        if (geozone) return geozone
        throw new BadRequestException("No geozone with this id")
    }
}
