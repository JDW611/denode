import { ClassProvider, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenModule } from '@core/token/token.module';
import { UserRepositoryModule } from '@domain/user/user-repository.module';
import { AuthServiceKey } from './interfaces/auth-service.interface';

const authService: ClassProvider = {
    provide: AuthServiceKey,
    useClass: AuthService,
};
@Module({
    imports: [TokenModule, UserRepositoryModule],
    controllers: [AuthController],
    providers: [authService],
})
export class AuthModule {}
