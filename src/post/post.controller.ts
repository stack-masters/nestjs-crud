import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/CreatePostDto'
import hash from 'src/utils/hash'
import { DeletePostDto } from './dto/DeletePostDto'
import { UpdatePostDto } from './dto/UpdatePostDto'

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createPost(@Body() body: CreatePostDto) {
    const post = body
    post.password = hash(body.password)

    await this.postService.save(body)

    return {
      success: true
    }
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  public async updatePost(@Body() body: UpdatePostDto) {
    await this.postService.update(body)

    return {
      success: true
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async deletePost(@Body() body: DeletePostDto) {
    await this.postService.delete(body)

    return {
      success: true
    }
  }
}