import { ApiProperty } from "@nestjs/swagger"
import { Point } from "src/point/point.model"

export class EditGeozoneDto{
    @ApiProperty({example: '2', description: 'Unique ID geozone'})
    readonly id: number

    @ApiProperty({example: 'new name', description: 'New name for geozone'})
    readonly name?: string

    @ApiProperty({example: [{lon:2.33, lat: 3.44, id:3},{lon:21.33, lat: 32.44, id:2},{lon:211.33, lat: 311.44, id:31}], description: 'Array of points in geozone'})
    readonly points?: Point[]
}
