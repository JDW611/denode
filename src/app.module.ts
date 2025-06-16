import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@config/config.module';
import { HealthModule } from '@modules/health/health.module';
import { AuthModule } from '@modules/auth/auth.module';

const applicationModules = [HealthModule, AuthModule];
@Module({
    imports: [CoreModule, ConfigModule, ...applicationModules],
})
export class AppModule {}
