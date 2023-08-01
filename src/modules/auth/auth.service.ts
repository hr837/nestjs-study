import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, password: string) {
    const user = await this.usersService.findOneByInfo(userName, password);
    if (!user) throw new BadRequestException('用户名或密码错误');
    const payload = { sub: user.id, userName };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
