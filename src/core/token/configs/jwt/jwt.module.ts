import { ConfigService } from '@config/services/config.service';
import { DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

export const getJwtModule = (): DynamicModule => {
    return JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const jwtConfig = configService.getJwtConfig();

            return {
                secret: jwtConfig.secret,
                signOptions: {
                    issuer: jwtConfig.issuer,
                    expiresIn: jwtConfig.expiresIn,
                },
            };
        },
    });
};
