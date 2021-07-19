import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    return new this.userModel(user).save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string) {
    return this.userModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.email === email);
      });
  }

  async findByUsername(username: string) {
    return this.userModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.username === username);
      });
  }

  async findByPhoneNumber(phoneNumber: number) {
    return this.userModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.phone === phoneNumber);
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
