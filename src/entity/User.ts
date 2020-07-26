import { hash } from "bcrypt";
import { Field, ID, ObjectType, Root, Authorized } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { USER } from "../constants";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  private tempPassword: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  role: number;

  @Authorized(USER)
  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column()
  age: number;

  @Column({ default: process.env.NODE_ENV === "development" })
  confirmed: boolean;

  @BeforeInsert()
  async generatePasswordAndHash() {
    this.password = await hash(this.password, 12);
    this.id = uuid();
  }

  @AfterLoad()
  loadtemp() {
    this.tempPassword = this.password!;
  }

  @BeforeUpdate()
  async hashPassword() {
    if (this.tempPassword !== this.password)
      this.password = await hash(this.password, 12);
  }
}
