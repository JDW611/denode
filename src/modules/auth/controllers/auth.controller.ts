import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthServiceKey, IAuthService } from '../interfaces/auth-service.interface';
import { BadRequestException } from '@core/exceptions/service.exception';
import { RegisterRequest } from '@common/request/auth/register.request';
import { ValidationResponse } from '@common/response/common/validation.response';
import { TokenResponse } from '@common/response/auth/token.response';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthServiceKey) private readonly service: IAuthService) {}
    @ApiOkResponseEntity(ValidationResponse)
    @Get('token/validate')
    @HttpCode(HttpStatus.OK)
    isValid(@Headers('Authorization') header: string): ValidationResponse {
        const headerArray = header.split(' ');

        if (headerArray.length != 2) {
            throw BadRequestException('Invalid authorization token format');
        }

        const [_, token] = headerArray;

        return new ValidationResponse(this.service.isValidated(token));
    }

    @ApiOkResponseEntity(TokenResponse)
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async register(@Body() dto: RegisterRequest): Promise<TokenResponse> {
        const [accessToken, refreshToken] = await this.service.signup(dto.toEntity());
        return new TokenResponse(accessToken, refreshToken);
    }
}
