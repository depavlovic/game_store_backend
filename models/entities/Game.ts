import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserGame } from "./UserGame";

@Entity()
export class Game {
  @PrimaryGeneratedColumn({ type: "int", name: "game_id" })
  gameId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("mediumtext", { name: "short_description", nullable: true })
  shortDescription: string | null;

  @Column("varchar", { name: "thumbnail", nullable: true, length: 255 })
  thumbnail: string | null;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: string = "";


  @OneToMany(() => UserGame, (userGame) => userGame.game)
  userGames: UserGame[];

}

