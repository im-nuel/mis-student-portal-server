// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EmployeeService } from './employees.class'
import { typeboxNullable } from '../../utils/typeboxNullable'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const employeeSchema = Type.Object(
  {
    id: typeboxNullable([Type.String(), Type.Number()]),
    emp_id: Type.String(),

    last_name: Type.String(),
    first_name: Type.String(),
    middle_name: typeboxNullable([Type.String()]),
    title_name: typeboxNullable([Type.String()]),

    section: Type.Enum({
      STAFF: 'STAFF',
      ES: 'ES',
      MS: 'MS',
      HS: 'HS'
    }),
    position: Type.String(),

    pob: Type.String(),
    dob: Type.String(),
    address: typeboxNullable([Type.String()]),
    effective_date: Type.String(),

    phone: typeboxNullable([Type.String()]),
    gender: Type.String(),
    email: typeboxNullable([Type.String()]),
    status: Type.Enum({
      DEACTIVE: 'DEACTIVE',
      INACTIVE: 'INACTIVE',
      ACTIVE: 'ACTIVE',
      WAITING: 'WAITING',
      RESIGN: 'RESIGN'
    }),

    user_id: typeboxNullable([Type.String(), Type.Number()]),
    created_at: typeboxNullable([Type.String()]),
    updated_at: typeboxNullable([Type.String()]),
    profile_image_url: typeboxNullable([Type.String()]),

    user: Type.Ref(userSchema)
  },
  { $id: 'Employee', additionalProperties: false }
)
export type Employee = Static<typeof employeeSchema>
export const employeeValidator = getValidator(employeeSchema, dataValidator)
export const employeeResolver = resolve<Employee, HookContext<EmployeeService>>({})

export const employeeExternalResolver = resolve<Employee, HookContext<EmployeeService>>({})

// Schema for creating new entries
export const employeeDataSchema = Type.Pick(employeeSchema, [
  'emp_id',
  'first_name',
  'last_name',
  'section',
  'position',
  'dob',
  'pob',
  'status'
], {
  $id: 'EmployeeData',
  additionalProperties: true
})
export type EmployeeData = Static<typeof employeeDataSchema>
export const employeeDataValidator = getValidator(employeeDataSchema, dataValidator)
export const employeeDataResolver = resolve<Employee, HookContext<EmployeeService>>({
  created_at: async (value) => value ?? new Date().toISOString(),
  updated_at: async (value) => value ?? new Date().toISOString()
})

// Schema for updating existing entries
export const employeePatchSchema = Type.Partial(employeeSchema, {
  $id: 'EmployeePatch',
  additionalProperties: true
})
export type EmployeePatch = Static<typeof employeePatchSchema>
export const employeePatchValidator = getValidator(employeePatchSchema, dataValidator)
export const employeePatchResolver = resolve<Employee, HookContext<EmployeeService>>({
  updated_at: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const employeeQueryProperties = Type.Pick(employeeSchema, [
  'id',
  'emp_id',
  'first_name',
  'last_name',
  'middle_name',
  'title_name',
  'section',
  'position',
  'dob',
  'pob',
  'gender',
  'email',
  'status',
  'created_at',
  'updated_at'
])

export const employeeQuerySchema = Type.Intersect(
  [
    querySyntax(employeeQueryProperties),
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export type EmployeeQuery = Static<typeof employeeQuerySchema>
export const employeeQueryValidator = getValidator(employeeQuerySchema, queryValidator)
export const employeeQueryResolver = resolve<EmployeeQuery, HookContext<EmployeeService>>({})