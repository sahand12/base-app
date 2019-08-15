// A Pipe is a class annotated with the @Injectable decorator.
// Pipes should implement PipeTransform interface.
// Pipes have 2 typical use case:
// 1. Transformation: transform input data to the desired output
// 2. Validation: evaluate input data and if valid, simply pass it
// through unchanged; otherwise, throw an exception when the data is incorrect.

// In both cases, pipes operate on the 'arguments' being processed by a
// controller route handler. Nest interposes a pipe just before a method is
// invoked, and the pipe receives the arguments destined for the method.
// Any transformation or validation operation takes place at that time,
// after which the route handler is invoked with any (potentially) transformed
// arguments

// Built-in pipes: 1. ValidationPipe 2. ParseIntPipe 3. ParseUUIDPipe.

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any, any> {

  // value: is the currently processed argument (before it is received by the route
  // handling method).
  // metadata: is its metadata.
  transform(value: any, metadata: ArgumentMetadata): any {
    return value;
  }
}
//
// // The metadata object has these properties:
// export interface ArgumentMetadata {
//   readonly type: 'body' | 'query' | 'param' | 'custom';
//   readonly metatype?: Type<any>;
//   readonly data?: string;
// }
