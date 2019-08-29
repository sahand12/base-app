import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Param,
  Query,
} from '@nestjs/common';
import * as safeJsonStringify from 'safe-json-stringify';
import * as R from 'ramda';
import { AuthGuard } from './sample-guard';
import { LoggingInterceptor } from '../../interceptors/sample.interceptor';
import { BodyValidationGuard } from '../../guards/body-validation.guard';
import { SignupDto } from './dto/signup.dto';
import { TransformationPipe } from '../../pipes/transformation.pipe';
import { cleanIRCellphoneNumber } from '../../pipes/helpers/is-valid-IR-cellphone-number';

// @UseInterceptors(LoggingInterceptor)
@Controller('plg')
export class PlgController {
  // @SetMetadata('schema', [{ schema: 'this is great' }])
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
    return safeJsonStringify(req);
  }

  @UseGuards(new BodyValidationGuard(SignupDto))
  @UsePipes(
    new TransformationPipe('body', [
      {
        name: 'cellphone',
        fn: cleanIRCellphoneNumber,
      },
      { name: 'name', fn: Boolean },
    ]),
  )
  @Post('/signup')
  signup(@Body() body) {
    return safeJsonStringify(body);
  }
}
