import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
  } from "typeorm";

@Entity()
export default class Carousel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, default: "" })
  img!: string;

  @Column({ length: 100, default: "" })
  title!: string;

  @Column({ length: 500, default: "" })
  description!: string;
}
