import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserGame } from "./UserGame";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user", { schema: "game_store" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @OneToMany(() => UserGame, (userGame) => userGame.user)
  userGames: UserGame[];
  purchasedGames: any;
}

export { UserGame };
