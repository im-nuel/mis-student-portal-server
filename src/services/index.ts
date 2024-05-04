import { siteConfig } from './site-config/site-config'
import { documentTemplates } from './document-templates/document-templates'
import { user } from './users/users'
import { student } from './students/students'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(siteConfig)
  app.configure(documentTemplates)
  app.configure(user)
  app.configure(student)
  // All services will be registered here
}
