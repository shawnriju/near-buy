import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If we passed a string to the decorator (like @GetUser('id')), 
    // it returns just that property. Otherwise, it returns the whole user object.
    return data ? user?.[data] : user;
  },
);