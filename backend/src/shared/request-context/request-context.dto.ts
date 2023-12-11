import { UserAccessTokenClaimsDto } from '@app/apps/auth/dtos';

export class RequestContextDto {
  public requestID: string;

  public url: string;

  public ip: string;

  // TODO : Discuss with team if this import is acceptable or if we should move UserAccessTokenClaims to shared.
  public user: UserAccessTokenClaimsDto;
}
