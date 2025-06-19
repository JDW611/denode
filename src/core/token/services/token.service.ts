import { Inject, Injectable } from '@nestjs/common';
import { ITokenService } from '../interfaces/token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '@domain/refresh-token/refresh-token-repository';
import { IRefreshTokenRepository } from '@domain/refresh-token/refresh-token-repository.interface';
import { User } from '@domain/user/user.entity';
import { AccessTokenClaimDto } from '@common/dto/token';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@config/services/config.service';
import { RefreshToken } from '@domain/refresh-token/refresh-token.entity';
import { DateTimeUtil } from '@common/utils/date-time.util';
import { TokenPayloadDto } from '@common/dto/token';
import { NotFoundException, UnauthorizedException } from '@core/exceptions/service.exception';
import { LocalDateTime } from '@js-joda/core';

@Injectable()
export class TokenService implements ITokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly env: ConfigService,
        @Inject(RefreshTokenRepository) private readonly repository: IRefreshTokenRepository,
    ) {}

    async createToken(user: User): Promise<string[]> {
        const accessTokenId = uuid();
        const accessToken = this.jwtService.sign(
            new TokenPayloadDto(accessTokenId, user.id, user.username).toPlain(),
        );
        const refreshToken = uuid();

        const expired = +this.env.jwt.refreshTokenExpired;
        await this.repository.save(
            RefreshToken.of(
                user,
                accessTokenId,
                refreshToken,
                DateTimeUtil.addWeek(new Date(), expired),
            ),
        );
        return [accessToken, refreshToken];
    }
    verifiedToken(token: string): AccessTokenClaimDto {
        try {
            return this.validate<AccessTokenClaimDto>(token);
        } catch (e) {
            throw UnauthorizedException('token is invalid');
        }
    }

    async refresh(accessToken: string, refreshToken: string): Promise<string[]> {
        try {
            const tokenClaim = this.validate<AccessTokenClaimDto>(accessToken, true);
            const target = await this.repository.findOneByTokens(tokenClaim.id, refreshToken);

            if (!target) {
                throw NotFoundException('refresh token is not found');
            }
            if (LocalDateTime.now().isAfter(target.expiredAt)) {
                throw UnauthorizedException('refresh token is expired');
            }

            const newToken = this.jwtService.sign(
                new TokenPayloadDto(
                    tokenClaim.id,
                    tokenClaim.userId,
                    tokenClaim.username,
                ).toPlain(),
            );
            const newRefreshToken = uuid();
            target.tokenRotate(newRefreshToken, tokenClaim.userId);
            await this.repository.save(target);
            return [newToken, newRefreshToken];
        } catch (e) {
            throw UnauthorizedException('token is invalid');
        }
    }

    async removeToken(accessToken: string): Promise<void> {
        const verified = this.validate<AccessTokenClaimDto>(accessToken, true);
        await this.repository.deleteByTokenId(verified.id);
    }

    private validate<T extends Object>(token: string, ignoreExpiration: boolean = false): T {
        return this.jwtService.verify<T>(token, { ignoreExpiration });
    }
}
