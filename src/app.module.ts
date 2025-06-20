import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@config/config.module';
import { HealthModule } from '@modules/health/health.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductModule } from '@modules/product/product.module';
import { StockModule } from '@modules/stock/stock.module';

const applicationModules = [HealthModule, AuthModule, ProductModule, StockModule];
@Module({
    imports: [CoreModule, ConfigModule, ...applicationModules],
})
export class AppModule {}
