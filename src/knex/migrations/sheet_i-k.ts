import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // SHEET //
  await knex.schema.createTableIfNotExists('sheet', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);

    table.string('name').notNullable();
    table.string('description');
    table.integer('proficiency_bonus').notNullable().defaultTo(2);
  }).finally(async () => {
    await knex('sheet').insert([
      { name: 'Lorcan', description: 'Tiene una maldición.' },
    ])
  })

  // SHEET_ATTRIBUTE //
  await knex.schema.createTableIfNotExists('sheet_attribute', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);

    table.integer('points').notNullable();
    table.integer('bonus').notNullable();
    table.boolean('is_competent').notNullable();

    // Relaciones
    table.integer('sheet_id').unsigned().notNullable().references('id').inTable('sheet').onDelete('CASCADE');
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sheet_attribute').insert([
      { points: 20, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 1 },
      { points: 14, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 2 },
      { points: 18, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 3 },
      { points: 10, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 4 },
      { points: 12, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 5 },
      { points: 10, bonus: 0, is_competent: true, sheet_id: 1, attribute_id: 6 },
    ])
  })

  // SHEET_SKILL //
  await knex.schema.createTableIfNotExists('sheet_skill', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);

    table.integer('points').notNullable();
    table.integer('bonus').notNullable();
    table.boolean('is_competent').notNullable();

    // Relaciones
    table.integer('sheet_id').unsigned().notNullable().references('id').inTable('sheet').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skill').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sheet_skill').insert([
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 1 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 2 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 3 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 4 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 5 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 6 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 7 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 8 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 9 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 10 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 11 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 12 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 13 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 14 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 15 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 16 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 17 },
      { points: 2, bonus: 0, is_competent: false, sheet_id: 1, skill_id: 18 },
    ])
  })

  // SHEET_CLASS //
  await knex.schema.createTableIfNotExists('sheet_class', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);

    table.integer('level').notNullable();

    // Relaciones
    table.integer('sheet_id').unsigned().notNullable().references('id').inTable('sheet').onDelete('CASCADE');
    table.integer('class_id').unsigned().notNullable().references('id').inTable('class').onDelete('CASCADE');
    table.integer('sub_class_id').unsigned().notNullable().references('id').inTable('sub_class').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sheet_class').insert([
      { level: 1, sheet_id: 1, class_id: 1, sub_class_id: 1 },
    ])
  })

  // SHEET_RACE //
  await knex.schema.createTableIfNotExists('sheet_race', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);

    // Relaciones
    table.integer('sheet_id').unsigned().notNullable().references('id').inTable('sheet').onDelete('CASCADE');
    table.integer('race_id').unsigned().notNullable().references('id').inTable('race').onDelete('CASCADE');
    table.integer('sub_race_id').unsigned().notNullable().references('id').inTable('sub_race').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sheet_race').insert([
      { sheet_id: 1, race_id: 1, sub_race_id: 1 },
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('sheet_race');
  await knex.schema.dropTableIfExists('sheet_class');
  await knex.schema.dropTableIfExists('sheet_skill');
  await knex.schema.dropTableIfExists('sheet_attribute');
  await knex.schema.dropTableIfExists('sheet');
}
