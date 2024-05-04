// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('document-templates', (table) => {
    table.increments('id')

    table.string('title')

    table.string('file_name')
    table.string('file_url')
    table.string('file_type')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('document-templates')
}
