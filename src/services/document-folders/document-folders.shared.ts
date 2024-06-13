// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  DocumentFolders,
  DocumentFoldersData,
  DocumentFoldersPatch,
  DocumentFoldersQuery,
  DocumentFoldersService
} from './document-folders.class'

export type { DocumentFolders, DocumentFoldersData, DocumentFoldersPatch, DocumentFoldersQuery }

export type DocumentFoldersClientService = Pick<
  DocumentFoldersService<Params<DocumentFoldersQuery>>,
  (typeof documentFoldersMethods)[number]
>

export const documentFoldersPath = 'document-folders'

export const documentFoldersMethods = [
  'find',
  // 'get',
  // 'create',
  // 'patch',
  'remove'
] as const

export const documentFoldersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(documentFoldersPath, connection.service(documentFoldersPath), {
    methods: documentFoldersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [documentFoldersPath]: DocumentFoldersClientService
  }
}
