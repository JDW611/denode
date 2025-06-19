import { Product } from '@domain/product/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CreateProductRequest {
    @ApiProperty({
        description: '상품 코드',
        example: 'PRD001',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: '상품 이름',
        example: '상품명',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: '상품 가격',
        example: 10000,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({
        description: '상품 설명',
        example: '상품 설명입니다.',
        type: String,
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: '상품 카테고리',
        example: '카테고리명',
        type: String,
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    category?: string;

    toEntity(): Product {
        return Product.create(this.code, this.name, this.price, this.description, this.category);
    }
}
