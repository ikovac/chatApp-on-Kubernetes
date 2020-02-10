import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Message } from "./message.entity";

@Entity() 
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string;

    @Column()
    pass: string;

    @Column()
    email: string;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];
}