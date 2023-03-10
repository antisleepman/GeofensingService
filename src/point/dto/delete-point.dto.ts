import { ApiProperty } from "@nestjs/swagger"

export class DeletePointDto {
    @ApiProperty({ example: '{id: 44}', description: 'Delete point' })
    readonly id: number
}