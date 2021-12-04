import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private paramsToExclude: string[]) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> | Promise<Observable<any>> | any {
    return next.handle().pipe(
      map((data) => {
        const { dataValues } = data;
        if (dataValues) {
          this.paramsToExclude.forEach((p) => {
            if (dataValues[p as keyof unknown]) {
              delete dataValues[p as keyof unknown];
            }
          });
        }
        return dataValues;
      }),
    );
  }
}
