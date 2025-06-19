import { ClassProvider, Module } from '@nestjs/common';
import { StockController } from './controllers/stock.controller';
import { StockService } from './services/stock.service';
import { StockRepositoryModule } from '@domain/stock/stock-repository.module';
import { StockHistoryRepositoryModule } from '@domain/stock-history/stock-history-repository.module';
import { StockServiceKey } from './interfaces/stock-service.interface';
import { ProductRepositoryModule } from '@domain/product/product-repository.module';
import { UserRepositoryModule } from '@domain/user/user-repository.module';

const stockService: ClassProvider = {
    provide: StockServiceKey,
    useClass: StockService,
};

@Module({
    imports: [
        StockRepositoryModule,
        StockHistoryRepositoryModule,
        ProductRepositoryModule,
        UserRepositoryModule,
    ],
    controllers: [StockController],
    providers: [stockService],
})
export class StockModule {}
