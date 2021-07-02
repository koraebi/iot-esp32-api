import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspController } from './esp/esp.controller';

@Module({
  imports: [],
  controllers: [AppController, EspController],
  providers: [AppService],
})
export class AppModule {}
