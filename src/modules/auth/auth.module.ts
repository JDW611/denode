import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenModule } from '@core/token/token.module';
import { UserRepositoryModule } from '@domain/user/user-repository.module';

@Module({
    imports: [TokenModule, UserRepositoryModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
