import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Post from './entities/post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/CreatePostDto'
import { DeletePostDto } from './dto/DeletePostDto'
import hash from 'src/utils/hash'
import { UpdatePostDto } from './dto/UpdatePostDto'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>
  ) {}

  public async save(post: CreatePostDto) {
    this.posts.save(post)
  }

  public async findByUuid(uuid: string) {
    return this.posts.findOne({
      where: { uuid }
    })
  }

  public async findByPage(page: number) {
    return this.posts.find({
      order: {
        createdAt: 'DESC'
      },
      take: 10,
      skip: +page * 10
    })
  }

  public async update(body: UpdatePostDto) {
    const post = await this.findByUuid(body.uuid)

    if (post === undefined) throw new ForbiddenException({ 
      success: false,
      message: 'Not found post.'
    })

    if (hash(body.password) !== post.password) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid password'
      })
    }

    return await this.posts.update(
      { uuid: body.uuid },
      {
        title: body.title,
        content: body.content
      }
    )
  }

  public async delete(body: DeletePostDto) {
    const post = await this.findByUuid(body.uuid)

    if (post === undefined) throw new ForbiddenException({ 
      success: false,
      message: 'Not found post.'
    })

    if (hash(body.password) !== post.password) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid password'
      })
    }

    return await this.posts.remove(post)
  }
}