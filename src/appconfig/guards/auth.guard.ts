import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private refleCtor: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取控制器的装饰参数，是否具有PUBLIC 标识
    const isPublicApi = this.refleCtor.get(IS_PUBLIC_KEY, context.getHandler());
    // 如果有PUBLIC标识，则不校验权限
    if (isPublicApi) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request.headers.authorization);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(authorization?: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
