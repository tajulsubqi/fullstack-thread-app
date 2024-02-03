import { MigrationInterface, QueryRunner } from "typeorm"

export class MyMigration1703924261479 implements MigrationInterface {
  name = "MyMigration1703924261479"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "userIdId" integer, "threadIdId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "threads" ("id" SERIAL NOT NULL, "content" character varying, "image" character varying, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "createdByIdId" integer, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "replies" ("id" SERIAL NOT NULL, "image" character varying, "content" character varying, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "userIdId" integer, "threadIdId" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying, "bio" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "following" ("id" SERIAL NOT NULL, "userIdId" integer, "following_id" integer, "follower_id" integer, CONSTRAINT "PK_c76c6e044bdf76ecf8bfb82a645" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "followers" ("follower_id" integer NOT NULL, "following_id" integer NOT NULL, CONSTRAINT "PK_8fc3b802b0b818a7f4c2b4c30ca" PRIMARY KEY ("follower_id", "following_id"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e11d02e2a1197cfb61759da5a8" ON "followers" ("follower_id") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_95627c64d9f57814010a003032" ON "followers" ("following_id") `,
    )
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_314680784cc4ba14bf392fbb873" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cc28874faae9823b38853f20823" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "threads" ADD CONSTRAINT "FK_9734df8d9b9b93b5eae713ed655" FOREIGN KEY ("createdByIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_829fabbd5394610739e5bb6746f" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_24ad14188b37dcd8686bf0d3862" FOREIGN KEY ("threadIdId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" ADD CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" ADD CONSTRAINT "FK_45428a713ee7d51def21b67ff20" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" ADD CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" DROP CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095"`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" DROP CONSTRAINT "FK_45428a713ee7d51def21b67ff20"`,
    )
    await queryRunner.query(
      `ALTER TABLE "following" DROP CONSTRAINT "FK_ced43d6f7a7b4f2f46df02e1134"`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_24ad14188b37dcd8686bf0d3862"`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_829fabbd5394610739e5bb6746f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "threads" DROP CONSTRAINT "FK_9734df8d9b9b93b5eae713ed655"`,
    )
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_cc28874faae9823b38853f20823"`,
    )
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_314680784cc4ba14bf392fbb873"`,
    )
    await queryRunner.query(`DROP INDEX "public"."IDX_95627c64d9f57814010a003032"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_e11d02e2a1197cfb61759da5a8"`)
    await queryRunner.query(`DROP TABLE "followers"`)
    await queryRunner.query(`DROP TABLE "following"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "replies"`)
    await queryRunner.query(`DROP TABLE "threads"`)
    await queryRunner.query(`DROP TABLE "likes"`)
  }
}
