import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attribute');
}
