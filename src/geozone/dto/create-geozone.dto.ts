import { ApiProperty } from "@nestjs/swagger"

export class CreateGeozoneDto {
    @ApiProperty({ example: 'geozone', description: 'String value for name' })
    readonly name: string

    @ApiProperty({ example: [{ lon: 2.33, lat: 3.44 }, { lon: 21.33, lat: 32.44 }, { lon: 211.33, lat: 311.44 }], description: 'Array of points in geozone' })
    readonly points: { lon: number, lat: number }[]
}