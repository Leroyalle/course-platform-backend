import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  id: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const UserIdOptional = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();

    return request.user?.id;
  },
);
