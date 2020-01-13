import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
  } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  account!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 100, default: "" })
  avatar!: string;

  @Column({ default: 1 })
  gender!: number;

  @Column({ length: 500, default: "" })
  intro!: string;
}

export const Schema = {
  id: { type: "number", required: true, example: 1 },
  account: { type: "number", required: true, example: "google@gmail.com" },
  password: { type: "string", required: true, example: "hash32" },
  avatar: {
    type: "string",
    required: false,
    example: "http://www.baidu.com/favicon.ico"
  },
  gender: { type: "number", required: false, example: 2 },
  intro: {
    type: "string",
    required: false,
    example: "this is a intro of somebody!"
  }
};
