import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseEntity } from '@common/response';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                if (data instanceof ResponseEntity) {
                    return data.toJSON();
                }

                const response = context.switchToHttp().getResponse();
                const statusCode = response.statusCode;

                return ResponseEntity.ok(data, statusCode).toJSON();
            }),
        );
    }
}
