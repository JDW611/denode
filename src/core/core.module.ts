import { ClassProvider, Global, Module } from '@nestjs/common';
import { LoggerService } from '@core/services/logger.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@core/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '@core/filters/http-exception.filter';
import { TransformInterceptor } from '@core/interceptors/transform.interceptor';
import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { ShutDownManager } from './util/shutdown.manager';
import { AlsModule } from './cls/cls.module';
import { TransactionManager } from './database/typeorm/transaction-manager';
import { TokenModule } from './token/token.module';
import { AuthorizationGuard } from './guards/authorization.guard';

const modules = [TokenModule];
const providers = [LoggerService, TransactionManager];
const interceptors: ClassProvider[] = [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
];
const guards: ClassProvider[] = [{ provide: APP_GUARD, useClass: AuthorizationGuard }];
const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];

@Global()
@Module({
    imports: [AlsModule.forRoot(), TypeOrmModule.forRoot(), ...modules],
    providers: [ShutDownManager, ...providers, ...interceptors, ...filters, ...guards],
    exports: [...providers],
})
export class CoreModule {}
