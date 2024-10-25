import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Usamos '!' para evitar el error de inicialización

  @CreateDateColumn({ type: 'text' }) // Especificamos 'text' para compatibilidad con SQLite
  created_at!: Date;

  @UpdateDateColumn({ type: 'text' }) // Especificamos 'text' para compatibilidad con SQLite
  updated_at!: Date;

  @Column()
  attri_name: string;

  @Column()
  up_attri_name: string;

  @Column()
  min_attri_name: string;

  @Column()
  up_min_attri_name: string;

  constructor(attri_name: string, up_attri_name: string, min_attri_name: string, up_min_attri_name: string) {
    this.attri_name = attri_name;
    this.up_attri_name = up_attri_name;
    this.min_attri_name = min_attri_name;
    this.up_min_attri_name = up_min_attri_name;
  }
}
