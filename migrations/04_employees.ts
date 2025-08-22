// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { knexHelper } from '../knexHelper'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('employees', (table) => {
    table.increments('id').primary()
    table.string('emp_id').notNullable()

    table.string('last_name').notNullable()
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('title_name')

    table.enum('section', ['STAFF', 'ES', 'MS', 'HS']).notNullable()
    table.string('position')

    table.string('pob') // place of birth
    table.date('dob')   // date of birth
    table.string('address')
    table.date('effective_date')

    table.string('phone')
    table.string('gender')
    table.string('email').unique().notNullable()

    table.enum('status', ['DEACTIVE', 'INACTIVE', 'ACTIVE', 'WAITING', 'RESIGN']).defaultTo('ACTIVE')

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('profile_image_url')

    knexHelper.table_timestamp(knex, table) // created_at & updated_at
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('employees')
}