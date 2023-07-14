import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { Esp } from './esp';

@Injectable()
export class AppService {
  async mongoAddEspData(esp: Esp): Promise<boolean> {
    try {
      const client = await MongoClient.connect(
        `mongodb://koraebi:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/?authSource=admin&readPreference=primary&ssl=false`,
        {
          useUnifiedTopology: true,
        },
      );

      const query = { mac: esp.mac };
      const update = {
        $set: {
          name: esp.name,
          ip: esp.ip,
          mac: esp.mac,
          led: esp.led,
          light: esp.light,
        },
      };
      const options = { upsert: true }; //Update ou Insert si inexistant
      client.db('iot').collection('esp').updateOne(query, update, options);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async mongoGetEspData(): Promise<string[]> {
    try {
      const client = await MongoClient.connect(
        `mongodb://koraebi:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/?authSource=admin&readPreference=primary&ssl=false`,
        {
          useUnifiedTopology: true,
        },
      );

      return await client.db('iot').collection('esp').find().toArray();
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
