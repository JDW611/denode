import { ResponseEntity } from '@common/response';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
    ApiAcceptedResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';

export const ApiOkResponseEntity = <TModel extends Type<unknown>>(
    model?: TModel,
    statusCode?: number,
    description?: string,
) => {
    const code = statusCode || HttpStatus.OK; // 기본값은 200
    const message = getStatusMessage(code);
    const defaultDescription = `${message} response`;
    const finalDescription = description || defaultDescription;
    const responseDecorator = getResponseDecorator(code);

    return applyDecorators(
        ApiExtraModels(ResponseEntity, ...(model ? [model] : [])),
        responseDecorator({
            description: finalDescription,
            schema:
                code === HttpStatus.NO_CONTENT
                    ? {
                          // 204 No Content는 result 필드 없음
                          type: 'object',
                          properties: {
                              code: { type: 'number', example: code },
                              message: { type: 'string', example: message },
                          },
                          required: ['code', 'message'],
                      }
                    : {
                          // 나머지는 result 필드 포함
                          type: 'object',
                          properties: {
                              code: { type: 'number', example: code },
                              message: { type: 'string', example: message },
                              ...(model && {
                                  result: { $ref: getSchemaPath(model) },
                              }),
                          },
                          required: ['code', 'message', ...(model ? ['result'] : [])],
                      },
        }),
    );
};

function getStatusMessage(statusCode: number): string {
    switch (statusCode) {
        case HttpStatus.OK:
            return 'OK';
        case HttpStatus.CREATED:
            return 'Created';
        case HttpStatus.ACCEPTED:
            return 'Accepted';
        case HttpStatus.NO_CONTENT:
            return 'No Content';
        default:
            return 'Success';
    }
}

function getResponseDecorator(statusCode: number) {
    switch (statusCode) {
        case HttpStatus.CREATED:
            return ApiCreatedResponse;
        case HttpStatus.NO_CONTENT:
            return ApiNoContentResponse;
        case HttpStatus.ACCEPTED:
            return ApiAcceptedResponse;
        case HttpStatus.OK:
        default:
            return ApiOkResponse;
    }
}
