import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({
    deprecated: false,
    summary: '创建新用户',
    parameters: [],
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: '新用户创建成功',
  })
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @ApiOperation({
    description: '获取全部用户',
  })
  async findAll(@Res() res: Response) {
    const result = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
