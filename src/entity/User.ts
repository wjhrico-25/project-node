import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity("users") //@Entity(table_name)
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    full_name: string

    @Column("text")
    email: string

    @Column("text")
    password: string

}
