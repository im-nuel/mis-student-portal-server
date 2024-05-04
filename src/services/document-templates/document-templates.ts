// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  documentTemplatesDataValidator,
  documentTemplatesPatchValidator,
  documentTemplatesQueryValidator,
  documentTemplatesResolver,
  documentTemplatesExternalResolver,
  documentTemplatesDataResolver,
  documentTemplatesPatchResolver,
  documentTemplatesQueryResolver
} from './document-templates.schema'

import type { Application } from '../../declarations'
import { DocumentTemplatesService, getOptions } from './document-templates.class'
import { documentTemplatesPath, documentTemplatesMethods } from './document-templates.shared'

export * from './document-templates.class'
export * from './document-templates.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const documentTemplates = (app: Application) => {
  // Register our service on the Feathers application
  app.use(documentTemplatesPath, new DocumentTemplatesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: documentTemplatesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(documentTemplatesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(documentTemplatesExternalResolver),
        schemaHooks.resolveResult(documentTemplatesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(documentTemplatesQueryValidator),
        schemaHooks.resolveQuery(documentTemplatesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(documentTemplatesDataValidator),
        schemaHooks.resolveData(documentTemplatesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(documentTemplatesPatchValidator),
        schemaHooks.resolveData(documentTemplatesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [documentTemplatesPath]: DocumentTemplatesService
  }
}
