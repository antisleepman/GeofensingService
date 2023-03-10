import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Geozone } from "./geozone/geozone.model";
import { GeozoneModule } from './geozone/geozone.module';
import { Point } from "./point/point.model";
import { PointModule } from './point/point.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host:  process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB ,
            models: [Geozone, Point],
            autoLoadModels: true,
            logging: false,
        }),
        GeozoneModule,
        PointModule,
    ]
})
export class AppModule { }