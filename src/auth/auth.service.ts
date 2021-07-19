import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

const email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    usernameField: string | number,
    pass: string,
  ): Promise<any> {
    let user: User;
    if (typeof usernameField === 'string') {
      user = email_reg.test(usernameField)
        ? await this.userService.findByEmail(usernameField)
        : await this.userService.findByUsername(usernameField);
    } else if (
      typeof usernameField === 'number' &&
      usernameField.toString().length === 11
    ) {
      user = await this.userService.findByPhoneNumber(usernameField);
    }
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    console.log(user);
    const payload = { username: user.username, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
