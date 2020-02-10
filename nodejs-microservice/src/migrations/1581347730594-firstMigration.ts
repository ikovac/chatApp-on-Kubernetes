import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1581347730594 implements MigrationInterface {
    name = 'firstMigration1581347730594'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `first_name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `first_name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `last_name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `last_name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `pass`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `pass` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `pass`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `pass` varchar(25) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(30) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `last_name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `last_name` varchar(25) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `first_name`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `first_name` varchar(25) NULL", undefined);
    }

}
