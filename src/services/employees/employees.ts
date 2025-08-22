// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  employeeDataValidator,
  employeePatchValidator,
  employeeQueryValidator,
  employeeResolver,
  employeeExternalResolver,
  employeeDataResolver,
  employeePatchResolver,
  employeeQueryResolver
} from './employees.schema'

import type { Application } from '../../declarations'
import { EmployeeService, getOptions } from './employees.class'
import { employeePath, employeeMethods } from './employees.shared'
import { convertDate } from '../../hooks/convert-date'
import { convertBoolean } from '../../hooks/convert-boolean'
import { createOrUpdate } from '../../hooks/create-or-update'

export * from './employees.class'
export * from './employees.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const employee = (app: Application) => {
  app.use(employeePath, new EmployeeService(getOptions(app)), {
    methods: employeeMethods,
    events: []
  })

  app.service(employeePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(employeeExternalResolver),
        schemaHooks.resolveResult(employeeResolver)
      ]
    },
    before: {
      all: [
        convertBoolean([
          'test_approval',
          'document_approval',
          'finance_policy',
          'transportation_policy',
          'residence_hall_policy'
        ]),
        schemaHooks.validateQuery(employeeQueryValidator),
        schemaHooks.resolveQuery(employeeQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        convertDate(['date_of_birth', 'register_date']),
        schemaHooks.validateData(employeeDataValidator),
        schemaHooks.resolveData(employeeDataResolver),
        createOrUpdate()
      ],
      patch: [
        convertDate(['date_of_birth', 'register_date']),
        schemaHooks.validateData(employeePatchValidator),
        schemaHooks.resolveData(employeePatchResolver)
      ],
      remove: []
    },
    after: {
      all: [
        convertBoolean([
          'test_approval',
          'document_approval',
          'finance_policy',
          'transportation_policy',
          'residence_hall_policy'
        ])
      ]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [employeePath]: EmployeeService
  }
}
