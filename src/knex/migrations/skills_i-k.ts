import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // SKILL //
  await knex.schema.createTableIfNotExists('skill', (table) => {
    table.increments('id').primary();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('short_name').notNullable();
    table.string('description')

    // Relaciones
    table.integer('attribute_id').unsigned().notNullable().references('id').inTable('attribute').onDelete('CASCADE');
  }).finally(async () => {
    await knex('skill').insert([
      { name: 'Atletismo', short_name: 'Atl', attribute_id: 1 },
      { name: 'Acrobacias', short_name: 'Acr', attribute_id: 2 },
      { name: 'Juego de manos', short_name: 'Jue', attribute_id: 2 },
      { name: 'Sigilo', short_name: 'Sig', attribute_id: 2 },
      { name: 'Arcano', short_name: 'Arc', attribute_id: 4 },
      { name: 'Historia', short_name: 'His', attribute_id: 4 },
      { name: 'Investigación', short_name: 'Inv', attribute_id: 4 },
      { name: 'Naturaleza', short_name: 'Nat', attribute_id: 4 },
      { name: 'Religion', short_name: 'Rel', attribute_id: 4 },
      { name: 'Trato con Animales', short_name: 'Tra', attribute_id: 5 },
      { name: 'Perspicacia', short_name: 'Per', attribute_id: 5 },
      { name: 'Medicina', short_name: 'Med', attribute_id: 5 },
      { name: 'Percepción', short_name: 'Per', attribute_id: 5 },
      { name: 'Supervivencia', short_name: 'Sup', attribute_id: 5 },
      { name: 'Engaño', short_name: 'Eng', attribute_id: 6 },
      { name: 'Intimidación', short_name: 'Int', attribute_id: 6 },
      { name: 'Persuación', short_name: 'Per', attribute_id: 6 },
      { name: 'Interpretación', short_name: 'Int', attribute_id: 6 },
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('skill');
}
