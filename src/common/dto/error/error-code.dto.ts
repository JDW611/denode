import { HttpStatus } from '@nestjs/common';

export class ErrorCodeDTO {
    constructor(readonly status: HttpStatus, readonly code: string, readonly message: string) {}
}

export const ErrorCodes = {
    INVALID_REQUEST_BODY: new ErrorCodeDTO(
        HttpStatus.BAD_REQUEST,
        'INVALID_REQUEST_BODY',
        'RequestBody is invalid',
    ),
    ENTITY_NOT_FOUND: new ErrorCodeDTO(
        HttpStatus.NOT_FOUND,
        'ENTITY_NOT_FOUND',
        'Entity Not Found',
    ),
    UNAUTHORIZED: new ErrorCodeDTO(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', 'Unauthorized'),
    NOT_FOUND: new ErrorCodeDTO(HttpStatus.NOT_FOUND, 'NOT_FOUND', 'Not Found'),
    BAD_REQUEST: new ErrorCodeDTO(HttpStatus.BAD_REQUEST, 'BAD_REQUEST', 'Bad Request'),
    CONFLICT: new ErrorCodeDTO(HttpStatus.CONFLICT, 'CONFLICT', 'Conflict'),
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
