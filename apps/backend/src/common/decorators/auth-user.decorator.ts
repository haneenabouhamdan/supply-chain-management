import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthUserDto } from '../dtos';

export const AuthUser = createParamDecorator(
  (field: keyof AuthUserDto, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user?.[field] || ctx.getContext().req.user;
  },
);
