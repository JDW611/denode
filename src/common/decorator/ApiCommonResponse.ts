import { ResponseEntity } from '@common/response';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiOkResponseEntity = <TModel extends Type<unknown>>(model?: TModel) =>
    applyDecorators(
        ApiExtraModels(ResponseEntity, ...(model ? [model] : [])),
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        type: 'object',
                        properties: {
                            code: { type: 'number', example: 200 },
                            message: { type: 'string', example: 'OK' },
                            ...(model && {
                                result: { $ref: getSchemaPath(model) },
                            }),
                        },
                        required: ['code', 'message', ...(model ? ['result'] : [])],
                    },
                ],
            },
        }),
    );
