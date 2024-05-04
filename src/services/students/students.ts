// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  studentDataValidator,
  studentPatchValidator,
  studentQueryValidator,
  studentResolver,
  studentExternalResolver,
  studentDataResolver,
  studentPatchResolver,
  studentQueryResolver
} from './students.schema'

import type { Application } from '../../declarations'
import { StudentService, getOptions } from './students.class'
import { studentPath, studentMethods } from './students.shared'
import { convertDate } from '../../hooks/convert-date'
import { convertBoolean } from '../../hooks/convert-boolean'

export * from './students.class'
export * from './students.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const student = (app: Application) => {
  // Register our service on the Feathers application
  app.use(studentPath, new StudentService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: studentMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(studentPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(studentExternalResolver),
        schemaHooks.resolveResult(studentResolver)
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
        schemaHooks.validateQuery(studentQueryValidator),
        schemaHooks.resolveQuery(studentQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        convertDate(['date_of_birth', 'register_date']),
        schemaHooks.validateData(studentDataValidator),
        schemaHooks.resolveData(studentDataResolver)
      ],
      patch: [
        convertDate(['date_of_birth', 'register_date']),
        schemaHooks.validateData(studentPatchValidator),
        schemaHooks.resolveData(studentPatchResolver)
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
    [studentPath]: StudentService
  }
}
