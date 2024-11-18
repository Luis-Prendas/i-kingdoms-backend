import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // ATTRIBUTE //
  await knex.schema.createTableIfNotExists('attribute', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('short_name').notNullable();
    table.string('description')
  }).finally(async () => {
    await knex('attribute').insert([
      { name: 'Fuerza', short_name: 'fue' },
      { name: 'Destreza', short_name: 'des' },
      { name: 'Constitución', short_name: 'con' },
      { name: 'Inteligencia', short_name: 'int' },
      { name: 'Sabiduría', short_name: 'sab' },
      { name: 'Carisma', short_name: 'car' },
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attribute');
}
