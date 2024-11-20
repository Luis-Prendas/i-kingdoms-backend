import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // RACE //
  await knex.schema.createTableIfNotExists('race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('description')
  }).finally(async () => {
    await knex('race').insert([
      { name: 'Elfo', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." }
    ])
  })

  // SUB_RACE //
  await knex.schema.createTableIfNotExists('sub_race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('description')

    // Relaciones
    table.integer('race_id').unsigned().notNullable().references('id').inTable('race').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sub_race').insert([
      { name: 'Alto Elfo', race_id: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Elfo de los bosques', race_id: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
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
      { bonus: 1, sub_race_id: 1, attribute_id: 3 },
      { bonus: 3, sub_race_id: 1, attribute_id: 4 },
      { bonus: 1, sub_race_id: 1, attribute_id: 5 },
      { bonus: 2, sub_race_id: 2, attribute_id: 2 },
      { bonus: 2, sub_race_id: 2, attribute_id: 3 },
      { bonus: 1, sub_race_id: 2, attribute_id: 5 },
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
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('race_skill_bonus');
  await knex.schema.dropTableIfExists('race_attribute_bonus');
  await knex.schema.dropTableIfExists('sub_race');
  await knex.schema.dropTableIfExists('race');
}
