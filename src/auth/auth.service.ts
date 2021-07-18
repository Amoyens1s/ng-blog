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

  async validateUser(usernameField: string, pass: string): Promise<any> {
    let user: User;
    user = await this.userService.findByEmail(usernameField);
    !user && (user = await this.userService.findByPhoneNumber(usernameField));
    !user && (user = await this.userService.findByUsername(usernameField));
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user._doc.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
