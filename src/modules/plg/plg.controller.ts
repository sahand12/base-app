import {
  Controller,
  Get,
  Post,
  Request,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as jsonStringify from 'safe-json-stringify';
import { AuthGuard } from './sample-guard';
import { LoggingInterceptor } from '../../interceptors/sample.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('plg')
export class PlgController {
  @SetMetadata('schema', [{ schema: 'this is great' }])
  @UseGuards(AuthGuard)
  @Get('/')
  getIndex() {
    return {
      success: true,
      data: {
        message: 'this is for testing the framework',
      },
    };
  }

  @Post('/')
  postIndex(@Request() req) {
    return jsonStringify(req);
  }
}
