import {MigrationInterface, QueryRunner} from "typeorm";

export class schemaMigration1581864094517 implements MigrationInterface {
    name = 'schemaMigration1581864094517'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `pass` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `message` (`id` int NOT NULL AUTO_INCREMENT, `message_text` text NOT NULL, `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, `conversationId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `conversation` (`id` int NOT NULL AUTO_INCREMENT, `is_group` tinyint NOT NULL DEFAULT 0, `group_name` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `conversation_users_user` (`conversationId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_7835ccf192c47ae47cd5c250d5` (`conversationId`), INDEX `IDX_b4d7dfd81d3b743bcfd1682abe` (`userId`), PRIMARY KEY (`conversationId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_446251f8ceb2132af01b68eb593` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_7cf4a4df1f2627f72bf6231635f` FOREIGN KEY (`conversationId`) REFERENCES `conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `conversation_users_user` ADD CONSTRAINT `FK_7835ccf192c47ae47cd5c250d5a` FOREIGN KEY (`conversationId`) REFERENCES `conversation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `conversation_users_user` ADD CONSTRAINT `FK_b4d7dfd81d3b743bcfd1682abeb` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `conversation_users_user` DROP FOREIGN KEY `FK_b4d7dfd81d3b743bcfd1682abeb`", undefined);
        await queryRunner.query("ALTER TABLE `conversation_users_user` DROP FOREIGN KEY `FK_7835ccf192c47ae47cd5c250d5a`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_7cf4a4df1f2627f72bf6231635f`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_446251f8ceb2132af01b68eb593`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b4d7dfd81d3b743bcfd1682abe` ON `conversation_users_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7835ccf192c47ae47cd5c250d5` ON `conversation_users_user`", undefined);
        await queryRunner.query("DROP TABLE `conversation_users_user`", undefined);
        await queryRunner.query("DROP TABLE `conversation`", undefined);
        await queryRunner.query("DROP TABLE `message`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
