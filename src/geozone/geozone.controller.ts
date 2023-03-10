import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGeozoneDto } from './dto/create-geozone.dto';
import { EditGeozoneDto } from './dto/edit-geozone.dto';
import { Geozone } from './geozone.model';
import { GeozoneService } from './geozone.service';

@ApiTags('Geozone')
@Controller('geozone')
export class GeozoneController {

    constructor(private geozoneService: GeozoneService) { }

    @ApiOperation({summary:'Create geozone'})
    @ApiResponse({status:200, type: Geozone})
    @Post()
    Create(@Body() GeozoneDTO: CreateGeozoneDto) {
        return this.geozoneService.CreateGeozone(GeozoneDTO)
    }

    @ApiOperation({summary:'Get  all geozones'})
    @ApiResponse({status:200, type: [Geozone]})
    @Get()
    GetAll(){
        return this.geozoneService.GetAllGeozones()
    }

    @ApiOperation({summary:'Get one geozones'})
    @ApiResponse({status:200, type: Geozone})
    @Get('/:id')
    GetOne(@Param('id') id: number){
        return this.geozoneService.GetOneGeozone({id})
    }

    @ApiOperation({summary:'Delete geozone'})
    @ApiResponse({status:200, type: Geozone})
    @Delete('/:id')
    Delete(@Param('id') id: number){
        return this.geozoneService.DeleteGeozone({id})
    }

    @ApiOperation({summary:'Update geozone'})
    @ApiResponse({status:200, type: Geozone})
    @Put()
    Edit(@Body() GeozoneDTO: EditGeozoneDto){
        return this.geozoneService.EditGeozone(GeozoneDTO)
    }
}
