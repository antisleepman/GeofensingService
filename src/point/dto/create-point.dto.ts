import { ApiProperty } from "@nestjs/swagger"

export class CreatePointDto {
    @ApiProperty({ example: '{lon:2.33, lat: 3.44, geozoneID: 2}', description: 'object for point' })
    readonly  lon: number
    readonly  lat: number
    readonly  geozoneId: number 
}