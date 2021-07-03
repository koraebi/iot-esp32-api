import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { Esp } from '../esp';

@Controller('esp')
export class EspController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addEsp(@Body() esp: Esp): Promise<boolean> {
    console.log(esp);
    if (esp?.mac === undefined) return false;

    return await this.appService.mongoAddEspData(esp);
  }

  @Get()
  async getAllEsp(): Promise<string[]> {
    return await this.appService.mongoGetEspData();
  }
}
