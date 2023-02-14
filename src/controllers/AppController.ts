import { IsPositive, IsNotEmpty } from 'class-validator';
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParams,
} from 'routing-controllers';
import { JsonController } from '../decorators';
import { AppService } from '../services/app.service';

class SearchQuery {
  @IsPositive({
    message: 'limit must be a positive number',
  })
  limit: number;

  @IsPositive({
    message: 'page must be a positive number',
  })
  page: number;
}

@JsonController('/')
export class AppController {
  constructor(private appService: AppService) {}
  @Get('')
  async getAll(@QueryParams() query?: SearchQuery) {
    return this.appService.sayHello(query.limit.toString());
  }
}
