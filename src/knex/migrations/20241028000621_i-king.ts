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
  await knex.schema.createTable('attribute', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('attribute_name').unique().notNullable();
    table.string('short_name').notNullable();
  })
  
  // SKILL //
  await knex.schema.createTable('skill', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('skill_name').unique().notNullable();
    table.string('short_name').notNullable();

    // Relaciones
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  })

  // RACE //
  await knex.schema.createTable('race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('race_name').unique().notNullable();
  });

  // SUB_RACE //
  await knex.schema.createTable('sub_race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('sub_race_name').unique().notNullable();

    // Relaciones
    table.integer('race_id').unsigned().notNullable().references('id').inTable('race').onDelete('CASCADE');
  });

  // RACE_ATTRIBUTE_BONUS //
  await knex.schema.createTable('race_attribute_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();

    // Relaciones
    table.integer('sub_race_id').unsigned().notNullable().references('id').inTable('sub_race').onDelete('CASCADE');
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  });

  // RACE_SKILL_BONUS //
  await knex.schema.createTable('race_skill_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();

    // Relaciones
    table.integer('sub_race_id').unsigned().notNullable().references('id').inTable('sub_race').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skill').onDelete('CASCADE');
  });

  /* DEFAULT DATA */
  await knex('attribute').insert([
    { attribute_name: 'Fuerza', short_name: 'fue' },
    { attribute_name: 'Destreza', short_name: 'des' },
    { attribute_name: 'Constitución', short_name: 'con' },
    { attribute_name: 'Inteligencia', short_name: 'int' },
    { attribute_name: 'Sabiduría', short_name: 'sab' },
    { attribute_name: 'Carisma', short_name: 'car' },
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('race_skill_bonus');
  await knex.schema.dropTableIfExists('race_attribute_bonus');
  await knex.schema.dropTableIfExists('sub_race');
  await knex.schema.dropTableIfExists('race');
  await knex.schema.dropTableIfExists('attribute');
  await knex.schema.dropTableIfExists('skill');
}