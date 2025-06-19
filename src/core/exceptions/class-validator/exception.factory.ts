import { ValidationError } from '@nestjs/common';
import { InvalidRequestBodyException } from '../service.exception';

export class ClassValidatorExceptionFactory {
    throw(): (errors: ValidationError[]) => void {
        return (errors: ValidationError[]): void => {
            if (!errors.length) return;

            const validationExceptions = errors.map(error => ({
                field: error.property,
                value: error.value,
                constraints: Object.values(error.constraints || {}),
            }));

            throw InvalidRequestBodyException('invalid request body', {
                validation: {
                    exceptions: validationExceptions,
                    count: validationExceptions.length,
                },
            });
        };
    }
}
