import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Geozone } from "src/geozone/geozone.model";

interface PointCreationAttr {
    lat: number,
    lon: number,
    geozoneID: number
}
@Table({ tableName: 'Points' })
export class Point extends Model<Point, PointCreationAttr>{
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '2.333', description: 'lat value of point' })
    @Column({ type: DataType.DOUBLE, allowNull: false })
    lat: number;

    @ApiProperty({ example: '4.33', description: 'lon value of point' })
    @Column({ type: DataType.DOUBLE, allowNull: false })
    lon: number;

    @ApiProperty({ example: '4', description: 'Id geozone' })
    @ForeignKey(() => Geozone)
    @Column({ type: DataType.INTEGER })
    geozoneId: number

    @BelongsTo(() => Geozone)
    geozone: Geozone
}  