import { ApiProperty } from "@nestjs/swagger"

export class FindPointDto {
    @ApiProperty({ example: '{id:3}', description: 'id for find point' })
    readonly id: number
}