import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Point } from 'src/point/point.model';
import { CreateGeozoneDto } from './dto/create-geozone.dto';
import { EditGeozoneDto } from './dto/edit-geozone.dto';
import { CheckPointDTO } from './dto/getone-geozone.dto';
import { Geozone } from './geozone.model';
import { GeozoneService } from './geozone.service';

@ApiTags('Geozone')
@Controller('geozone')
export class GeozoneController {

	constructor(private geozoneService: GeozoneService) { }

	@ApiOperation({ summary: 'Check point is in geozone' })
	@Post('IsInGeozone')
	async Check(@Body() {geozoneId, lat, lon}: CheckPointDTO) {
		try {
			const zone = await this.geozoneService.GetOneGeozone({ id: geozoneId })
			let result = false
			let xp = zone.points[0].lat
			let yp = zone.points[0].lon
			for (let i = 1; i < zone.points.length; i++) {
				xp = zone.points[i].lat
				yp = zone.points[i].lon
				const xp_prev = zone.points[i - 1].lat
				const yp_prev = zone.points[i - 1].lon
				if ((((yp <= lon && lon < yp_prev) || yp_prev <= lon && lon < yp)) && (lat > (xp_prev - xp) * (lon - yp) / (yp_prev - yp) + xp)) result = !result
			}
			return { IsInGeozone: result }
		} catch (e) {
			throw e
		}
	}



	@ApiOperation({ summary: 'Create geozone' })
	@ApiResponse({ status: 200, type: Geozone })
	@Post()
	Create(@Body() GeozoneDTO: CreateGeozoneDto) {
		try {
			return this.geozoneService.CreateGeozone(GeozoneDTO)
		} catch (e) {
			throw new InternalServerErrorException(e)
		}

	}

	@ApiOperation({ summary: 'Get  all geozones' })
	@ApiResponse({ status: 200, type: [Geozone] })
	@Get()
	GetAll() {
		try {
			return this.geozoneService.GetAllGeozones()
		} catch (e) {
			throw new InternalServerErrorException(e)
		}

	}

	@ApiOperation({ summary: 'Get one geozones' })
	@ApiResponse({ status: 200, type: Geozone })
	@Get('/:id')
	GetOne(@Param('id') id: number) {
		try {
			return this.geozoneService.GetOneGeozone({ id })
		} catch (e) {
			throw new InternalServerErrorException(e)
		}

	}

	@ApiOperation({ summary: 'Delete geozone' })
	@ApiResponse({ status: 200, type: Geozone })
	@Delete('/:id')
	Delete(@Param('id') id: number) {
		try {
			return this.geozoneService.DeleteGeozone({ id })
		} catch (e) {
			throw new InternalServerErrorException(e)
		}

	}

	@ApiOperation({ summary: 'Update geozone' })
	@ApiResponse({ status: 200, type: Geozone })
	@Put()
	Edit(@Body() GeozoneDTO: EditGeozoneDto) {
		try {
			return this.geozoneService.EditGeozone(GeozoneDTO)
		} catch (e) {
			throw new InternalServerErrorException(e)
		}
	}
}
