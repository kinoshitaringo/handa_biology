import User from "./User";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
  } from "typeorm";

@Entity()
export default class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column("text", { nullable: true })
  content?: string;

  @ManyToOne(() => User, { nullable: false })
  author!: User;
}
