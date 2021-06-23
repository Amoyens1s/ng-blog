import { ApiProperty } from '@nestjs/swagger';
import { createArticle } from '../interface/article.interface';

export class CreateArticleDTO implements createArticle {
  @ApiProperty({
    description: '文章的标题',
    example: 'Learn Nest in 10 hours',
    required: false,
    type: 'string',
  })
  readonly title: string;

  /**
   * 文章的简介字段
   * @example 这是一段描述
   */
  readonly description: string;

  @ApiProperty()
  readonly body: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly date: string;
}

export class createArticleResponse {
  @ApiProperty({
    description: '文章的标题',
    example: 'Learn Nest in 10 hours',
    type: 'string',
  })
  message: 'Post has been submitted successfully!';

  /**
   * Post  of create article response
   */
  post: CreateArticleDTO;
}
