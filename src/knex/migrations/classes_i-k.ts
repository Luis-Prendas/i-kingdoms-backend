import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // CLASS //
  await knex.schema.createTableIfNotExists('class', table => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('description')
  }).finally(async () => {
    await knex('class').insert([
      { name: 'Barbaro', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Bardo', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Picaro', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Monge', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    ])
  })

  // SUB_CLASS //
  await knex.schema.createTableIfNotExists('sub_class', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('description');
    table.integer('required_level').notNullable();

    // Relaciones
    table.integer('class_id').unsigned().notNullable().references('id').inTable('class').onDelete('CASCADE');
  }).finally(async () => {
    await knex('sub_class').insert([
      { name: 'Barbaro', class_id: 1, required_level: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Bardo', class_id: 2, required_level: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Picaro', class_id: 3, required_level: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { name: 'Monge', class_id: 4, required_level: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    ])
  })

  // CLASS_ATTRIBUTE_BONUS //
  await knex.schema.createTableIfNotExists('class_attribute_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();
    table.integer('required_level').notNullable();

    // Relaciones
    table.integer('sub_class_id').unsigned().notNullable().references('id').inTable('sub_class').onDelete('CASCADE');
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  }).finally(async () => {
    await knex('class_attribute_bonus').insert([
      { bonus: 1, sub_class_id: 1, attribute_id: 1, required_level: 1 },
      { bonus: 1, sub_class_id: 1, attribute_id: 2, required_level: 1 },
      { bonus: 1, sub_class_id: 1, attribute_id: 3, required_level: 1 },
      { bonus: 1, sub_class_id: 1, attribute_id: 4, required_level: 1 },
      { bonus: 1, sub_class_id: 1, attribute_id: 5, required_level: 1 },
      { bonus: 1, sub_class_id: 1, attribute_id: 6, required_level: 1 },
      { bonus: 3, sub_class_id: 2, attribute_id: 1, required_level: 1 },
      { bonus: 1, sub_class_id: 2, attribute_id: 2, required_level: 1 },
      { bonus: 2, sub_class_id: 2, attribute_id: 3, required_level: 1 },
      { bonus: 2, sub_class_id: 3, attribute_id: 4, required_level: 1 },
      { bonus: 2, sub_class_id: 3, attribute_id: 5, required_level: 1 },
      { bonus: 2, sub_class_id: 4, attribute_id: 2, required_level: 1 },
      { bonus: 2, sub_class_id: 4, attribute_id: 3, required_level: 1 },
    ])
  })

  // CLASS_SKILL_BONUS //
  await knex.schema.createTableIfNotExists('class_skill_bonus', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.integer('bonus').notNullable();
    table.integer('required_level').notNullable();

    // Relaciones
    table.integer('sub_class_id').unsigned().notNullable().references('id').inTable('sub_class').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skill').onDelete('CASCADE');
  }).finally(async () => {
    await knex('class_skill_bonus').insert([
      { bonus: 2, sub_class_id: 1, skill_id: 8, required_level: 1 },
      { bonus: 2, sub_class_id: 1, skill_id: 14, required_level: 1 },
      { bonus: 2, sub_class_id: 2, skill_id: 1, required_level: 1 },
      { bonus: 4, sub_class_id: 2, skill_id: 16, required_level: 1 },
      { bonus: -2, sub_class_id: 2, skill_id: 11, required_level: 1 },
      { bonus: -2, sub_class_id: 2, skill_id: 13, required_level: 1 },
      { bonus: 2, sub_class_id: 3, skill_id: 5, required_level: 1 },
      { bonus: 2, sub_class_id: 3, skill_id: 6, required_level: 1 },
      { bonus: 4, sub_class_id: 4, skill_id: 8, required_level: 1 },
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('class_skill_bonus');
  await knex.schema.dropTableIfExists('class_attribute_bonus');
  await knex.schema.dropTableIfExists('sub_class');
  await knex.schema.dropTableIfExists('class');
}
