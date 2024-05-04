// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, queryProperty, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { StudentService } from './students.class'
import { create } from 'domain'
import { typeboxNullable } from '../../utils/typeboxNullable'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const studentSchema = Type.Object(
  {
    id: typeboxNullable(Type.Number()),
    nisn: typeboxNullable(Type.String()),

    last_name: typeboxNullable(Type.String()),
    first_name: Type.String(),
    middle_name: typeboxNullable(Type.String()),
    nickname: typeboxNullable(Type.String()),

    rank_in_family: typeboxNullable(Type.String()),
    citizenship: typeboxNullable(Type.String()),
    age: typeboxNullable(Type.Number()),
    place_of_birth: Type.String(),
    date_of_birth: Type.String(),
    gender: Type.Enum({
      male: 'male',
      femail: 'female'
    }),
    address: typeboxNullable(Type.String()),
    phone_number: typeboxNullable(Type.String()),
    email: typeboxNullable(Type.String()),
    previous_school: typeboxNullable(Type.String()),
    religion: Type.String(),
    status: typeboxNullable(
      Type.Enum({
        new: 'new',
        old: 'old',
        transfer: 'transfer'
      })
    ),
    semester: typeboxNullable(Type.String()),
    school_year: Type.String(),
    registration_number: typeboxNullable(Type.String()),
    academic_status: Type.String(),
    asother: typeboxNullable(Type.String()),
    family_card_number: typeboxNullable(Type.String()),
    section: Type.Enum({
      ECP: 'ECP',
      ES: 'ES',
      MS: 'MS',
      HS: 'HS'
    }),
    grade: Type.Enum({
      KD1: 'KD1',
      KD2: 'KD2',
      NSY: 'NSY',
      G1: 'G1',
      G2: 'G2',
      G3: 'G3',
      G4: 'G4',
      G5: 'G5',
      G6: 'G6',
      G7: 'G7',
      G8: 'G8',
      G9: 'G9',
      G10: 'G10',
      G11: 'G11',
      G12: 'G12'
    }),
    program: Type.String(),
    other_program: Type.String(),

    transportation: Type.Union([Type.Null(), Type.String()]),
    transportation_policy: typeboxNullable(Type.String()),
    pick_up_point: Type.Union([Type.Null(), Type.String()]),

    residence_hall: typeboxNullable(Type.String()),
    residence_hall_policy: typeboxNullable(Type.String()),
    residence_hall_payment: typeboxNullable(Type.String()),

    father_name: Type.Union([Type.Null(), Type.String()]),
    father_occupation: Type.Union([Type.Null(), Type.String()]),
    father_company: Type.Union([Type.Null(), Type.String()]),
    father_address: Type.Union([Type.Null(), Type.String()]),
    father_phone_number: Type.Union([Type.Null(), Type.String()]),
    father_email: Type.Union([Type.Null(), Type.String()]),

    mother_name: Type.Union([Type.Null(), Type.String()]),
    mother_occupation: Type.Union([Type.Null(), Type.String()]),
    mother_company: Type.Union([Type.Null(), Type.String()]),
    mother_address: Type.Union([Type.Null(), Type.String()]),
    mother_phone_number: Type.Union([Type.Null(), Type.String()]),
    mother_email: Type.Union([Type.Null(), Type.String()]),

    guardian_name: Type.Union([Type.Null(), Type.String()]),
    guardian_address: Type.Union([Type.Null(), Type.String()]),
    guardian_phone_number: Type.Union([Type.Null(), Type.String()]),
    guardian_relation: Type.Union([Type.Null(), Type.String()]),

    tuition_fee: Type.String(),
    finance_policy: Type.String(),

    register_date: Type.String({ format: 'date-time' }),

    document_approval: Type.String(),
    test_approval: Type.String(),

    account_status: Type.Enum({
      active: 'active',
      inactive: 'inactive',
      withdrawn: 'withdrawn',
      graduated: 'graduated'
    }),

    profile_image_url: typeboxNullable(Type.String()),

    created_at: typeboxNullable(Type.String()),
    updated_at: typeboxNullable(Type.String()),

    user_id: typeboxNullable(Type.Number()),
    user: Type.Ref(userSchema),
  },
  { $id: 'Student', additionalProperties: false }
)
export type Student = Static<typeof studentSchema>
export const studentValidator = getValidator(studentSchema, dataValidator)
export const studentResolver = resolve<Student, HookContext<StudentService>>({})

export const studentExternalResolver = resolve<Student, HookContext<StudentService>>({})

// Schema for creating new entries
export const studentDataSchema = Type.Pick(studentSchema, ['status', 'semester', 'school_year'], {
  $id: 'StudentData',
  additionalProperties: true
})
export type StudentData = Static<typeof studentDataSchema>
export const studentDataValidator = getValidator(studentDataSchema, dataValidator)
export const studentDataResolver = resolve<Student, HookContext<StudentService>>({
  // created_at: async (value) => (value ? value : new Date().toISOString().slice(0, 19).replace('T', ' ')),
  // updated_at: async (value) => (value ? value : new Date().toISOString().slice(0, 19).replace('T', ' ')),
  register_date: async (value) => (value ? value : new Date().toISOString().slice(0, 19).replace('T', ' '))
})

// Schema for updating existing entries
export const studentPatchSchema = Type.Partial(studentSchema, {
  $id: 'StudentPatch',
  additionalProperties: true
})
export type StudentPatch = Static<typeof studentPatchSchema>
export const studentPatchValidator = getValidator(studentPatchSchema, dataValidator)
export const studentPatchResolver = resolve<Student, HookContext<StudentService>>({})

// Schema for allowed query properties
export const studentQueryProperties = Type.Pick(studentSchema, [
  'id',
  'nisn',
  'last_name',
  'first_name',
  'middle_name',
  'nickname',
  'academic_status',
  'account_status',
  'address',
  'age',
  'asother',
  'citizenship',
  'date_of_birth',
  // 'document_approval',
  'email',
  'family_card_number',
  'father_address',
  'father_company',
  'father_email',
  'father_name',
  'father_occupation',
  'father_phone_number',
  'finance_policy',
  'gender',
  'grade',
  'guardian_address',
  'guardian_name',
  'guardian_phone_number',
  'guardian_relation',
  'mother_address',
  'mother_company',
  'mother_email',
  'mother_name',
  'mother_occupation',
  'mother_phone_number',
  'other_program',
  'phone_number',
  'pick_up_point',
  'place_of_birth',
  'previous_school',
  'program',
  'rank_in_family',
  'register_date',
  'registration_number',
  'religion',
  'residence_hall_payment',
  'residence_hall_policy',
  'residence_hall',
  'school_year',
  'section',
  'semester',
  'status',
  // 'test_approval',
  'transportation_policy',
  'transportation',
  'tuition_fee'
])

export const studentQuerySchema = Type.Intersect(
  [
    querySyntax(studentQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export type StudentQuery = Static<typeof studentQuerySchema>
export const studentQueryValidator = getValidator(studentQuerySchema, queryValidator)
export const studentQueryResolver = resolve<StudentQuery, HookContext<StudentService>>({})
