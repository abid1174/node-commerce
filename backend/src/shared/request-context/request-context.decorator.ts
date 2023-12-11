import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestContextDto } from './request-context.dto';
import { createRequestContext } from '.';

export const ReqContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestContextDto => {
    const request = ctx.switchToHttp().getRequest();

    return createRequestContext(request);
  },
);
