import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Game } from "./Game";
import { User } from "./User";

@Index("fk_user_game_game_idx", ["gameId"], {})
@Entity("user_game", { schema: "game_store" })
export class UserGame {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { primary: true, name: "game_id" })
  gameId: number;

  @Column("datetime", { name: "purchase_date", nullable: true })
  purchaseDate: Date | null;

  @ManyToOne(() => Game, (game) => game.userGames, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "gameId" }])
  game: Game;

  @ManyToOne(() => User, (user) => user.userGames, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}

