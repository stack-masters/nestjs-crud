import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: 'post'
})
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  public readonly uuid: string

  @Column({
    name: 'title',
    type: 'varchar',
    length: 24,
    nullable: false
  })
  public readonly title: string

  @Column({
    name: 'cotent',
    type: 'text',
    nullable: false
  })
  public readonly content: string

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false
  })
  public readonly password: string

  @CreateDateColumn({
    name: 'createdAt',
    nullable: false
  })
  createdAt: Date;
}