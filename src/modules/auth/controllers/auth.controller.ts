import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Put,
} from '@nestjs/common';
import { AuthServiceKey, IAuthService } from '../interfaces/auth-service.interface';
import { BadRequestException } from '@core/exceptions/service.exception';
import { RegisterRequest } from '@common/request/auth/register.request';
import { ValidationResponse } from '@common/response/common/validation.response';
import { TokenResponse } from '@common/response/auth/token.response';
import { ApiOkResponseEntity } from '@common/decorator/ApiCommonResponse';
import { LoginRequest } from '@common/request/auth/login.request';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshRequest } from '@common/request/auth/refresh.request';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthServiceKey) private readonly service: IAuthService) {}
    @ApiBearerAuth()
    @ApiOkResponseEntity(ValidationResponse, HttpStatus.OK, '토큰 유효성 검사 성공')
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: '토큰 유효성 검사' })
    @HttpCode(HttpStatus.OK)
    @Get('token/validate')
    isValid(@Headers('Authorization') header: string): ValidationResponse {
        const headerArray = header.split(' ');

        if (headerArray.length != 2) {
            throw BadRequestException('Invalid authorization token format');
        }

        const [_, token] = headerArray;

        return new ValidationResponse(this.service.isValidated(token));
    }

    @ApiOkResponseEntity(TokenResponse, HttpStatus.CREATED, '회원가입 성공 - 인증 토큰 발급')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: '회원가입' })
    @HttpCode(HttpStatus.CREATED)
    @Post('/signup')
    async register(@Body() dto: RegisterRequest): Promise<TokenResponse> {
        const [accessToken, refreshToken] = await this.service.signup(dto.toEntity());
        return new TokenResponse(accessToken, refreshToken);
    }

    @ApiOkResponseEntity(TokenResponse, HttpStatus.OK, '로그인 성공 - 인증 토큰 발급')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: '로그인' })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() dto: LoginRequest): Promise<TokenResponse> {
        const [accessToken, refreshToken] = await this.service.login(dto.username, dto.password);
        return new TokenResponse(accessToken, refreshToken);
    }

    @ApiOkResponseEntity(TokenResponse, HttpStatus.OK, '토큰 갱신 성공 - 새로운 토큰 발급')
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: '토큰 갱신' })
    @HttpCode(HttpStatus.OK)
    @Put('/refresh')
    async refresh(@Body() dto: RefreshRequest): Promise<TokenResponse> {
        const [accessToken, refreshToken] = await this.service.refresh(
            dto.accessToken,
            dto.refreshToken,
        );
        return new TokenResponse(accessToken, refreshToken);
    }

    @ApiBearerAuth()
    @ApiOkResponseEntity(null, HttpStatus.NO_CONTENT, '로그아웃 성공 - 인증 토큰 삭제')
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: '로그아웃' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/logout')
    async logout(@Headers('Authorization') header: string): Promise<void> {
        const headerArray = header.split(' ');

        if (headerArray.length != 2) {
            throw BadRequestException('Invalid authorization token format');
        }

        const [_, token] = headerArray;
        return this.service.logout(token);
    }
}
