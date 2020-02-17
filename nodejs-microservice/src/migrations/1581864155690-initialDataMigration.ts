import {MigrationInterface, QueryRunner} from "typeorm";

export class initialDataMigration1581864155690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("INSERT INTO user (first_name, last_name, username, pass, email) VALUES ('Mate', 'Matic', 'mmatic', 'mate123', 'mmatic@gmail.com'),('Jure', 'Juric', 'jjuric', 'jure123', 'jjuric@gmail.com'),('Ivo', 'Ivic', 'iivic', 'ivo123', 'iivic@gmail.com'),('Ante', 'Antic', 'aantic', 'ante123', 'aantic@gmail.com'),('Anica', 'Anic', 'aanic', 'anica123', 'aanic@gmail.com')");
        await queryRunner.query("INSERT INTO conversation (is_group, group_name) VALUES (false, ''), (true, 'Grupa podvodnih ribolovaca')");
        await queryRunner.query("INSERT INTO conversation_users_user (userId, conversationId) VALUES (1, 1), (3, 1), (3, 2), (4, 2), (5, 2)");
        await queryRunner.query("INSERT INTO message (message_text, userId, conversationId) VALUES ('Pozdrav Ivo, Mate je.', 1, 1), ('Oooj Mate, sta ima?', 3, 1), ('A evo nista moj prijatelju poso, kuca, birtija', 1, 1)");
        await queryRunner.query("INSERT INTO message (message_text, userId, conversationId) VALUES ('Dobrodošli u grupu podvnodnih ribolovaca. Ivo', 3, 2), ('Hvala Ivo. Ante', 4, 2), ('Pozdrav svima. Anica', 5, 2)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
