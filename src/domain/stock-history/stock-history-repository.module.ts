import { ClassProvider, Module } from '@nestjs/common';
import { StockHistoryRepository } from './stock-history.repository';
import { StockHistoryRepositoryKey } from './stock-history-repository.interface';

export const stockHistoryRepository: ClassProvider = {
    provide: StockHistoryRepositoryKey,
    useClass: StockHistoryRepository,
};

@Module({
    providers: [stockHistoryRepository],
    exports: [stockHistoryRepository],
})
export class StockHistoryRepositoryModule {}
