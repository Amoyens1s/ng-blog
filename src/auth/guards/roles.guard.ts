import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decode } from 'js-base64';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [header, payload, signature] = token.split('.');
    const permissions = JSON.parse(decode(payload)).permission;
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
