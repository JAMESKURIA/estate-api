import { IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("refresh_tokens")
export class RefreshToken {
  @IsUUID()
  @PrimaryColumn("uuid")
  id!: string;

  @IsString()
  @Column("text")
  token!: string;
}
