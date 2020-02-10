import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Conversation } from "./conversation.entity";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    message_text: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    timestamp: string;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @ManyToOne(type => Conversation, conversation => conversation.messages)
    conversation: Conversation;
}