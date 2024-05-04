import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('document-templates').del()

  // Inserts seed entries
  await knex('document-templates').insert([
    {
      id: 1000,
      title: '',
      file_name: 'Student_Document-template.docx',
      file_type: 'application/msword',
      file_url: 'https://ik.imagekit.io/c2rr9aewn/Application%20Form%20MIS%20(6).docx?updatedAt=1714631341171'
    }
  ])
}
