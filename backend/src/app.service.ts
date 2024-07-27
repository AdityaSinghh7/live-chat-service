import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {title: 'Hello My World! - from the backend'};
  }
}
