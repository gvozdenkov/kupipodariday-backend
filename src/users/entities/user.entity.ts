import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
