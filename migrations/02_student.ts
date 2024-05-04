// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'
import { knexHelper } from '../knexHelper'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('students', (table) => {
    table.increments('id').primary()
    table.string('nisn')
    table.string('last_name')
    table.string('first_name').notNullable()
    table.string('middle_name')
    table.string('nickname')
    table.string('rank_in_family')
    table.string('citizenship')
    table.integer('age')
    table.string('place_of_birth')
    table.date('date_of_birth')
    table.string('gender')
    table.string('address')
    table.string('phone_number')
    table.string('email')
    table.string('previous_school')
    table.string('religion')
    table.enum('status', ['new', 'old', 'transfer'])
    table.string('semester')
    table.string('school_year')
    table.string('registration_number')
    table.string('academic_status')
    table.string('asother')
    table.string('family_card_number')
    table.string('section')
    table.string('grade')
    table.string('program')
    table.string('other_program')

    table.string('transportation')
    table.string('transportation_policy')
    table.string('pick_up_point')

    table.string('residence_hall')
    table.string('residence_hall_policy')
    table.string('residence_hall_payment')

    table.string('father_name')
    table.string('father_occupation')
    table.string('father_company')
    table.string('father_address')
    table.string('father_phone_number')
    table.string('father_email')

    table.string('mother_name')
    table.string('mother_occupation')
    table.string('mother_company')
    table.string('mother_address')
    table.string('mother_phone_number')
    table.string('mother_email')

    table.string('guardian_name')
    table.string('guardian_address')
    table.string('guardian_phone_number')
    table.string('guardian_relation')

    table.string('tuition_fee')
    table.string('finance_policy')
    table.datetime('register_date')

    table.string('document_approval')
    table.string('test_approval')

    table.enum('account_status', ['active', 'inactive', 'withdrawn', 'graduated'])

    table.string('profile_image_url')

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    knexHelper.table_timestamp(knex, table)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('students')
}
