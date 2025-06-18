import { Inject, Controller, HttpCode, HttpStatus, Get, Query, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockServiceKey } from '../interfaces/stock-service.interface';
import { IStockService } from '../interfaces/stock-service.interface';
import { DenodeContext } from '@core/decorators/denode-context.decorator';
import { DenodeUser } from '@common/dto/context/denode-user.dto';
import { FindStocksRequest } from '@common/request/stock/find-stocks.request';
import { FindStockHistoriesRequest } from '@common/request/stock/find-stock-histories.request';
import { StockListResponse } from '@common/response/stock/stock-list.response';
import { StockHistoryListResponse } from '@common/response/stock/stock-history-list.reponse';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';
import { CreateStockMovementRequest } from '@common/request/stock/create-stock-movement,request';

@ApiTags('Stock API')
@ApiBearerAuth()
@Controller('stocks')
export class StockController {
    constructor(
        @Inject(StockServiceKey)
        private readonly stockService: IStockService,
    ) {}

    @ApiOperation({ summary: '재고 조회' })
    @ApiOkResponseEntity(StockListResponse, HttpStatus.OK, '재고 조회 성공')
    @HttpCode(HttpStatus.OK)
    @Get()
    async findStocks(
        @DenodeContext() denodeUser: DenodeUser,
        @Query() query: FindStocksRequest,
    ): Promise<StockListResponse> {
        const { count, rows } = await this.stockService.findStocks(
            denodeUser.userId,
            query.page,
            query.limit,
        );
        return new StockListResponse(count, rows);
    }

    @ApiOperation({ summary: '재고 이력 조회' })
    @ApiOkResponseEntity(StockHistoryListResponse, HttpStatus.OK, '재고 이력 조회 성공')
    @HttpCode(HttpStatus.OK)
    @Get('history')
    async findStockHistories(
        @DenodeContext() denodeUser: DenodeUser,
        @Query() query: FindStockHistoriesRequest,
    ): Promise<StockHistoryListResponse> {
        const { count, rows } = await this.stockService.findStockHistories(
            denodeUser.userId,
            query.page,
            query.limit,
            query.type,
        );
        return new StockHistoryListResponse(count, rows);
    }

    @ApiOperation({ summary: '제품 입/출고' })
    @ApiOkResponseEntity(null, HttpStatus.NO_CONTENT, '제품 입/출고 성공')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('movements')
    async createStockMovement(
        @DenodeContext() denodeUser: DenodeUser,
        @Body() dto: CreateStockMovementRequest,
    ): Promise<void> {
        return await this.stockService.createStockMovement(
            denodeUser.userId,
            dto.type,
            dto.productId,
            dto.quantity,
            dto.expirationDate,
            dto.reason,
        );
    }
}
