import { Knex } from 'knex'

export const knexHelper = {
  table_timestamp(knex: Knex, table: Knex.CreateTableBuilder) {
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  }
}
