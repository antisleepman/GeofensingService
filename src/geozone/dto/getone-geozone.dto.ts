import { ApiProperty } from "@nestjs/swagger"

export class GetOneGeozoneDto {
    @ApiProperty({ example: { id: 3 }, description: 'id for search geozone' })
    readonly id: number
}

 
export class CheckPointDTO {
    @ApiProperty({example:4.4, description: 'lat value'})
    readonly lat: number

    @ApiProperty({example:1.4, description: 'lon value'})
    readonly lon: number

    @ApiProperty({example:3, description: 'Id geozone'})
    readonly geozoneId: number
}
 export class ResultCheckPointDto{
    @ApiProperty({example:false, description: 'response on function'})
    readonly IsInGeozone: boolean
 }