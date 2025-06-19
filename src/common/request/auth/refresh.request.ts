import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshRequest {
    @ApiProperty({
        description: '엑세스 토큰',
        example: 'accessToken',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly accessToken: string;

    @ApiProperty({
        description: '리프레시 토큰',
        example: 'refreshToken',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly refreshToken: string;
}
