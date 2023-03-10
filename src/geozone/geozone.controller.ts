import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/utils/ParamsTransaction';
import { TransactionInterceptor } from 'src/utils/transaction.interceptor';
import { CreateGeozoneDto } from './dto/create-geozone.dto';
import { EditGeozoneDto } from './dto/edit-geozone.dto';
import { Geozone } from './geozone.model';
import { GeozoneService } from './geozone.service';

@ApiTags('Geozone')
@Controller('geozone')
export class GeozoneController {

    constructor(private geozoneService: GeozoneService) { }

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
