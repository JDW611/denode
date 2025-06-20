import { plainToClass, Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsBoolean,
    ValidateNested,
    IsEnum,
    validateSync,
} from 'class-validator';
import { Environment } from '@common/enums/environment.enum';

class DatabaseConfigValidation {
    @IsString()
    host: string;

    @IsNumber()
    port: number;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    database: string;

    @IsBoolean()
    synchronize: boolean;
}

class AppConfigValidation {
    @IsNumber()
    port: number;

    @IsEnum(Environment)
    environment: Environment;
}

class JWTConfigValidation {
    @IsString()
    secret: string;

    @IsString()
    issuer: string;

    @IsString()
    expiresIn: string;

    @IsString()
    refreshTokenExpired: string;
}

export class EnvironmentVariables {
    @ValidateNested()
    @Type(() => DatabaseConfigValidation)
    database: DatabaseConfigValidation;

    @ValidateNested()
    @Type(() => AppConfigValidation)
    app: AppConfigValidation;

    @ValidateNested()
    @Type(() => JWTConfigValidation)
    jwt: JWTConfigValidation;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return {
        database: {
            host: config.DB_HOST,
            port: parseInt(config.DB_PORT as string, 10),
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            synchronize: config.DB_SYNCHRONIZE,
        },
        app: {
            port: parseInt(config.PORT as string, 10),
            environment: config.NODE_ENV as Environment,
        },
        jwt: {
            secret: config.JWT_SECRET,
            issuer: config.JWT_ISSUER,
            expiresIn: config.JWT_EXPIRES_IN,
            refreshTokenExpired: config.JWT_REFRESH_TOKEN_EXPIRED,
        },
    };
}
