// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { documentFoldersClient } from './services/document-folders/document-folders.shared'
export type {
  DocumentFolders,
  DocumentFoldersData,
  DocumentFoldersQuery,
  DocumentFoldersPatch
} from './services/document-folders/document-folders.shared'

import { siteConfigClient } from './services/site-config/site-config.shared'
export type {
  SiteConfig,
  SiteConfigData,
  SiteConfigQuery,
  SiteConfigPatch
} from './services/site-config/site-config.shared'

import { documentTemplatesClient } from './services/document-templates/document-templates.shared'
export type {
  DocumentTemplates,
  DocumentTemplatesData,
  DocumentTemplatesQuery,
  DocumentTemplatesPatch
} from './services/document-templates/document-templates.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the mis-portal-server app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(documentTemplatesClient)
  client.configure(siteConfigClient)
  client.configure(documentFoldersClient)
  return client
}
