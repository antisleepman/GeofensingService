import { ApiProperty } from "@nestjs/swagger"

export class GetOneGeozoneDto{
    @ApiProperty({example: '{id:3}', description: 'id for search geozone'})
    readonly id: number
}