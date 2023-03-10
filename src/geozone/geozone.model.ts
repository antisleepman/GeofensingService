import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { Point } from "src/point/point.model";

interface GeozoneCreationAttr {
    name: string,
    points: Point[]
}

@Table({ tableName: 'geozones' })
export class Geozone extends Model<Geozone, GeozoneCreationAttr>{
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'geozone', description: 'name geozone' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;
    
    @HasMany(() => Point, { onDelete: 'cascade', hooks: true} )
    points: Point[];
}