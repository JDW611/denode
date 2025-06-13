import { ClassProvider, Module } from '@nestjs/common';
import { TokenServiceKey } from './interfaces/token-service.interface';
import { TokenService } from './services/token.service';
import { getJwtModule } from './configs/jwt/jwt.module';
import { RefreshTokenRepositoryModule } from 'src/domain/refresh-token/refresh-token-repository.module';

const tokenService: ClassProvider = {
    provide: TokenServiceKey,
    useClass: TokenService,
};

@Module({
    imports: [getJwtModule(), RefreshTokenRepositoryModule],
    providers: [tokenService],
    exports: [tokenService],
})
export class TokenModule {}
