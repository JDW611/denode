import { Environment } from '@common/enums/environment.enum';

export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
}

export interface AppConfig {
    port: number;
    environment: Environment;
}

export interface JWTConfig {
    secret: string;
    issuer: string;
    expiresIn: string;
    refreshTokenExpired: string;
}

export interface Config {
    database: DatabaseConfig;
    app: AppConfig;
    jwt: JWTConfig;
}
