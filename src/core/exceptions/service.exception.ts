import { ErrorCode, ErrorCodes } from '@common/dto/error/error-code.dto';
import { BaseException } from '@core/exceptions/base.exception';

export class ServiceException extends BaseException {
    constructor(readonly errorCode: ErrorCode, message?: string, detail?: any) {
        super(errorCode.status, message || errorCode.message, detail);
    }
}

export const InvalidRequestBodyException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.INVALID_REQUEST_BODY, message, detail);
};

export const EntityNotFoundException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.ENTITY_NOT_FOUND, message, detail);
};

export const UnauthorizedException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.UNAUTHORIZED, message, detail);
};

export const NotFoundException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.NOT_FOUND, message, detail);
};

export const MethodNotAllowedException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.METHOD_NOT_ALLOWED, message, detail);
};

export const BadRequestException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.BAD_REQUEST, message, detail);
};

export const ConflictException = (message?: string, detail?: any): ServiceException => {
    return new ServiceException(ErrorCodes.CONFLICT, message, detail);
};
