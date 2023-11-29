import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from './post/post.module'
import Post from './post/entities/post.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestbase',
      entities: [
        Post
      ],
      logging: true,
      synchronize: true
    }),
    PostModule
  ]
})
export class AppModule {}
