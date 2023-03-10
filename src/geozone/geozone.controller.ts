import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateGeozoneDto, ResultCreateGeozoneDto } from './dto/create-geozone.dto';
import { EditGeozoneDto } from './dto/edit-geozone.dto';
import { CheckPointDTO, ResultCheckPointDto } from './dto/getone-geozone.dto';
import { Geozone } from './geozone.model';
import { GeozoneService } from './geozone.service';

@ApiTags('Geozone')
@Controller('geozone')
export class GeozoneController {
	constructor(private geozoneService: GeozoneService) { }

	@ApiOperation({ summary: 'Check point is in geozone' })
	@ApiResponse({
		status: 201, schema: {
			allOf: [{ $ref: getSchemaPath(ResultCheckPointDto) },
			{ properties: { IsInGeozone: { type: "boolean" } } },],
		}
	})
	@Post('IsInGeozone')
	async Check(@Body() { geozoneId, lat, lon }: CheckPointDTO) {
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
	}



	@ApiOperation({ summary: 'Create geozone' })
	@ApiResponse({
		status: 201, schema: {
			allOf: [{ $ref: getSchemaPath(ResultCreateGeozoneDto) },
			{
				properties: {
					id: { type: "number" },
					lon: { type: "number" },
					updatedAt: { type: "string", format: 'date-time' },
					createdAt: { type: 'string', format: "date-time" },
					points: {
						type: "array", items:
						{
							type: "object",
							properties: {
								id: { type: 'number' },
								lon: { type: 'number' },
								lat: { type: 'number' },
								geozoneId: { type: "number" }
							}
						}
					}
				}
			},],
		}
	})
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
