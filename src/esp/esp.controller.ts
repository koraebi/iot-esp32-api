import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('esp')
export class EspController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addEsp(
    @Body('name') name: string,
    @Body('ip') ip: string,
    @Body('mac') mac: string,
    @Body('led') led: boolean,
    @Body('light') light: number,
  ): Promise<boolean> {
    if (mac === undefined) return false;

    return await this.appService.mongoAddEspData(name, ip, mac, led, light);
  }

  @Get()
  async getAllEsp(): Promise<string[]> {
    return await this.appService.mongoGetEspData();
  }
}