import { Body, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  async mongoAddEspData(
    name: string,
    ip: string,
    mac: string,
    led: boolean,
    light: number,
  ): Promise<boolean> {
    try {
      const client = await MongoClient.connect(
        'mongodb://koraebi:7STgrind*@52.43.76.141:27017/?authSource=admin&readPreference=primary&ssl=false',
        {
          useUnifiedTopology: true,
        },
      );

      const query = { mac: mac };
      const update = {
        $set: {
          name: name,
          ip: ip,
          mac: mac,
          led: led,
          light: light,
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
        'mongodb://koraebi:7STgrind*@52.43.76.141:27017/?authSource=admin&readPreference=primary&ssl=false',
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
