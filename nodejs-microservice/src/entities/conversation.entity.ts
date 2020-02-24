import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Message } from "./message.entity";
import { User } from "./user.entity";


@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    is_group: boolean;

    @Column({ default: '' })
    group_name: string;

    @OneToMany(type => Message, messages => messages.conversation)
    messages: Message[];

    @ManyToMany(type => User, {
        cascade: true
    })
    @JoinTable()
    users: User[];
}