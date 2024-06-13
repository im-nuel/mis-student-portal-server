// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  documentFoldersDataValidator,
  documentFoldersPatchValidator,
  documentFoldersQueryValidator,
  documentFoldersResolver,
  documentFoldersExternalResolver,
  documentFoldersDataResolver,
  documentFoldersPatchResolver,
  documentFoldersQueryResolver
} from './document-folders.schema'

import type { Application } from '../../declarations'
import { DocumentFoldersService, getOptions } from './document-folders.class'
import { documentFoldersPath, documentFoldersMethods } from './document-folders.shared'

export * from './document-folders.class'
export * from './document-folders.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const documentFolders = (app: Application) => {
  // Register our service on the Feathers application
  app.use(documentFoldersPath, new DocumentFoldersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: documentFoldersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(documentFoldersPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(documentFoldersExternalResolver),
        schemaHooks.resolveResult(documentFoldersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(documentFoldersQueryValidator),
        schemaHooks.resolveQuery(documentFoldersQueryResolver)
      ],
      find: [],
      // get: [],
      // create: [
      //   schemaHooks.validateData(documentFoldersDataValidator),
      //   schemaHooks.resolveData(documentFoldersDataResolver)
      // ],
      // patch: [
      //   schemaHooks.validateData(documentFoldersPatchValidator),
      //   schemaHooks.resolveData(documentFoldersPatchResolver)
      // ],
      // remove: []
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
    [documentFoldersPath]: DocumentFoldersService
  }
}
