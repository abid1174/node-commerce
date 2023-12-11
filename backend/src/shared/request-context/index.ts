import { UserAccessTokenClaimsDto } from '@app/apps/auth/dtos';
import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from '../../common/constants';
import { RequestContextDto } from './request-context.dto';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

export function createRequestContext(request: Request): RequestContextDto {
  const ctx = new RequestContextDto();
  ctx.requestID = request.header(REQUEST_ID_TOKEN_HEADER);
  ctx.url = request.url;
  ctx.ip = request.header(FORWARDED_FOR_TOKEN_HEADER)
    ? request.header(FORWARDED_FOR_TOKEN_HEADER)
    : request.ip;

  // If request.user does not exist, we explicitly set it to null.
  ctx.user = request.user
    ? plainToClass(UserAccessTokenClaimsDto, request.user, {
        excludeExtraneousValues: true,
      })
    : null;

  return ctx;
}

export * from './request-context.decorator';
export * from './request-context.dto';
