import { IsEmail, IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Todos } from "./todo.js";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "username is required" })
  username!: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  email!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "password is required" })
  password!: string;

  @OneToMany((type) => Todos, (todo) => todo.userId)
  todos!: Todos[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
