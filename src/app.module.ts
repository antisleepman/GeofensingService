import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' })],
  providers: [],
})
export class AppModule {

}
