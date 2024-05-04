// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { knexHelper } from '../knexHelper'
import { USER_ROLE } from '../src/services/users/users.schema'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    const roles = Object.values(USER_ROLE)
    table.increments('id').primary()

    table.string('email').unique()
    table.string('password')

    table.enum('role', roles)

    knexHelper.table_timestamp(knex, table)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
