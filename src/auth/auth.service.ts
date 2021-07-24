import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    usernameField: string | number,
    passwordField: string,
  ): Promise<any> {
    let user: User;
    if (typeof usernameField === 'string') {
      user = await this.userService.findByEmail(usernameField);
    } else if (typeof usernameField === 'number') {
      user = await this.userService.findByPhoneNumber(usernameField);
    }
    if (user && user.password === passwordField) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, expireTime?: number) {
    const payload = { permission: user.permission, id: user._id };
    const token = this.jwtService.sign(payload, {
      expiresIn: expireTime,
    });
    this.userService.addToken(user._id, token);
    return {
      token: token,
    };
  }

  async logout(userId: string, request: { headers: { authorization: any } }) {
    const authorization = request.headers.authorization;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, token] = authorization.split(' ');
    await this.userService.removeToken(userId, token);
  }
}
