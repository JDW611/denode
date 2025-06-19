import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IProductService, ProductServiceKey } from '../interfaces/product-service.interface';
import { CreateProductRequest } from '@common/request/product/create-product.request';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';
import { DenodeUser } from '@common/dto/context/denode-user.dto';
import { DenodeContext } from '@core/decorators/denode-context.decorator';

@ApiTags('Product API')
@ApiBearerAuth()
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@Controller('products')
export class ProductController {
    constructor(@Inject(ProductServiceKey) private readonly productService: IProductService) {}

    @ApiOkResponseEntity(null, HttpStatus.CREATED, '제품 등록 성공')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
    @ApiOperation({ summary: '제품 등록' })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(
        @DenodeContext() denodeUser: DenodeUser,
        @Body() dto: CreateProductRequest,
    ): Promise<void> {
        return await this.productService.create(denodeUser.userId, dto.toEntity());
    }
}
