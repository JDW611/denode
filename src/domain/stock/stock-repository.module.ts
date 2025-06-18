import { ClassProvider, Module } from '@nestjs/common';
import { StockRepository } from './stock.repository';
import { StockRepositoryKey } from './stock-respository.interface';

export const stockRepository: ClassProvider = {
    provide: StockRepositoryKey,
    useClass: StockRepository,
};

@Module({
    providers: [stockRepository],
    exports: [stockRepository],
})
export class StockRepositoryModule {}
