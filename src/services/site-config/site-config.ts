// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  siteConfigDataValidator,
  siteConfigPatchValidator,
  siteConfigQueryValidator,
  siteConfigResolver,
  siteConfigExternalResolver,
  siteConfigDataResolver,
  siteConfigPatchResolver,
  siteConfigQueryResolver
} from './site-config.schema'

import type { Application } from '../../declarations'
import { SiteConfigService, getOptions } from './site-config.class'
import { siteConfigPath, siteConfigMethods } from './site-config.shared'

export * from './site-config.class'
export * from './site-config.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const siteConfig = (app: Application) => {
  // Register our service on the Feathers application
  app.use(siteConfigPath, new SiteConfigService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: siteConfigMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(siteConfigPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(siteConfigExternalResolver),
        schemaHooks.resolveResult(siteConfigResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(siteConfigQueryValidator),
        schemaHooks.resolveQuery(siteConfigQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(siteConfigDataValidator),
        schemaHooks.resolveData(siteConfigDataResolver)
      ],
      patch: [
        schemaHooks.validateData(siteConfigPatchValidator),
        schemaHooks.resolveData(siteConfigPatchResolver)
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
    [siteConfigPath]: SiteConfigService
  }
}
