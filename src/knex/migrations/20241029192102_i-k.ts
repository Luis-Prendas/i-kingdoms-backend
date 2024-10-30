import type { Knex } from "knex";

/* 
table.integer('race_id')
  .unsigned() // Asegura que el valor sea positivo
  .notNullable() // El campo es obligatorio
  .references('id') // Referencia a la columna 'id' de la tabla 'race'
  .inTable('race') // Especifica la tabla a la que se refiere
  .onDelete('CASCADE'); // Elimina subrazas si se elimina la raza principal
*/

export async function up(knex: Knex): Promise<void> {
  /////////////////////* TABLES */////////////////////

  // ATTRIBUTE //
  await knex.schema.createTableIfNotExists('attribute', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('attribute_name').notNullable();
    table.string('short_name').notNullable();
  }).finally(async () => {
    await knex('attribute').insert([
      { attribute_name: 'Fuerza', short_name: 'fue' },
      { attribute_name: 'Destreza', short_name: 'des' },
      { attribute_name: 'Constitución', short_name: 'con' },
      { attribute_name: 'Inteligencia', short_name: 'int' },
      { attribute_name: 'Sabiduría', short_name: 'sab' },
      { attribute_name: 'Carisma', short_name: 'car' },
    ])
  })

  // SKILL //
  await knex.schema.createTableIfNotExists('skill', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('skill_name').notNullable();
    table.string('short_name').notNullable();

    // Relaciones
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  }).finally(async () => {
    await knex('skill').insert([
      { skill_name: 'Atletismo', short_name: 'Atl', attribute_id: 1 },
      { skill_name: 'Acrobacias', short_name: 'Acr', attribute_id: 2 },
      { skill_name: 'Juego de manos', short_name: 'Jue', attribute_id: 2 },
      { skill_name: 'Sigilo', short_name: 'Sig', attribute_id: 2 },
      { skill_name: 'Arcano', short_name: 'Arc', attribute_id: 4 },
      { skill_name: 'Historia', short_name: 'His', attribute_id: 4 },
      { skill_name: 'Investigación', short_name: 'Inv', attribute_id: 4 },
      { skill_name: 'Naturaleza', short_name: 'Nat', attribute_id: 4 },
      { skill_name: 'Religion', short_name: 'Rel', attribute_id: 4 },
      { skill_name: 'Trato con Animales', short_name: 'Tra', attribute_id: 5 },
      { skill_name: 'Perspicacia', short_name: 'Per', attribute_id: 5 },
      { skill_name: 'Medicina', short_name: 'Med', attribute_id: 5 },
      { skill_name: 'Percepción', short_name: 'Per', attribute_id: 5 },
      { skill_name: 'Supervivencia', short_name: 'Sup', attribute_id: 5 },
      { skill_name: 'Engaño', short_name: 'Eng', attribute_id: 6 },
      { skill_name: 'Intimidación', short_name: 'Int', attribute_id: 6 },
      { skill_name: 'Persuación', short_name: 'Per', attribute_id: 6 },
      { skill_name: 'Interpretación', short_name: 'Int', attribute_id: 6 },
    ])
  })

  // RACE //
  await knex.schema.createTableIfNotExists('race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('race_name').notNullable();
    table.string('description')
  }).finally(async () => {
    await knex('race').insert([
      { race_name: 'Humano', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { race_name: 'Elfo', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." }
    ])
  })

  // SUB_RACE //
  await knex.schema.createTableIfNotExists('sub_race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('sub_race_name').notNullable();
    table.string('description')

    // Relaciones
    table.integer('race_id').unsigned().notNullable().references('id').inTable('race').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sub_race').insert([
      { sub_race_name: 'Variante', race_id: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { sub_race_name: 'Robusto', race_id: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { sub_race_name: 'Alto Elfo', race_id: 2, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { sub_race_name: 'Elfo de los bosques', race_id: 2, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    ])
  })

  // RACE_ATTRIBUTE_BONUS //
  await knex.schema.createTableIfNotExists('race_attribute_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();

    // Relaciones
    table.integer('sub_race_id').unsigned().notNullable().references('id').inTable('sub_race').onDelete('CASCADE');
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  }).finally(async () => {
    await knex('race_attribute_bonus').insert([
      { bonus: 1, sub_race_id: 1, attribute_id: 1 },
      { bonus: 1, sub_race_id: 1, attribute_id: 2 },
      { bonus: 1, sub_race_id: 1, attribute_id: 3 },
      { bonus: 1, sub_race_id: 1, attribute_id: 4 },
      { bonus: 1, sub_race_id: 1, attribute_id: 5 },
      { bonus: 1, sub_race_id: 1, attribute_id: 6 },
      { bonus: 3, sub_race_id: 2, attribute_id: 1 },
      { bonus: 1, sub_race_id: 2, attribute_id: 2 },
      { bonus: 2, sub_race_id: 2, attribute_id: 3 },
      { bonus: 2, sub_race_id: 3, attribute_id: 4 },
      { bonus: 2, sub_race_id: 3, attribute_id: 5 },
      { bonus: 2, sub_race_id: 4, attribute_id: 2 },
      { bonus: 2, sub_race_id: 4, attribute_id: 3 },
    ])
  })

  // RACE_SKILL_BONUS //
  await knex.schema.createTableIfNotExists('race_skill_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();

    // Relaciones
    table.integer('sub_race_id').unsigned().notNullable().references('id').inTable('sub_race').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skill').onDelete('CASCADE');
  }).finally(async () => {
    await knex('race_skill_bonus').insert([
      { bonus: 2, sub_race_id: 1, skill_id: 8 },
      { bonus: 2, sub_race_id: 1, skill_id: 14 },
      { bonus: 2, sub_race_id: 2, skill_id: 1 },
      { bonus: 4, sub_race_id: 2, skill_id: 16 },
      { bonus: -2, sub_race_id: 2, skill_id: 11 },
      { bonus: -2, sub_race_id: 2, skill_id: 13 },
      { bonus: 2, sub_race_id: 3, skill_id: 5 },
      { bonus: 2, sub_race_id: 3, skill_id: 6 },
      { bonus: 4, sub_race_id: 4, skill_id: 8 },
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('race_skill_bonus');
  await knex.schema.dropTableIfExists('race_attribute_bonus');
  await knex.schema.dropTableIfExists('sub_race');
  await knex.schema.dropTableIfExists('race');
  await knex.schema.dropTableIfExists('attribute');
  await knex.schema.dropTableIfExists('skill');
}