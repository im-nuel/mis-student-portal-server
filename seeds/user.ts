import { Knex } from 'knex'
import { localStrategy } from '../src/authentication'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  let password = await localStrategy.hashPassword('admin', {}) // Pass an empty object as the second argument

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@mis.sch.id',
      password: password, // Use the hashed password
      role: 'administrator'
    }
  ])
}
