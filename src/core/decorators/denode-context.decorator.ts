import { DenodeUser } from '@common/dto/context/denode-user.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export const DenodeContext = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): DenodeUser => {
        const request = ctx.switchToHttp().getRequest();
        return plainToInstance(DenodeUser, request.denodeUser);
    },
);
