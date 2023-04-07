import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./app-user.js";

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("longtext", { nullable: false })
  description!: string;

  @ManyToOne((type) => Users, (user) => user.id)
  userId!: Relation<Users>;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
