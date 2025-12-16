import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1765926396191 implements MigrationInterface {
    name = 'CreateUserTable1765926396191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(250) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
