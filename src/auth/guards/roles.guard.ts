import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { parseToken } from '@tools';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.headers.authorization;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, token] = user.split(' ');
    const permissions = parseToken(token).permission;
    if (permissions.includes('master')) {
      return true;
    }
    if (!roles.includes('master') && permissions.includes('admin')) {
      return true;
    }
    if (permissions.includes(roles[0])) {
      return true;
    }
    return false;
  }
}
