// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  DocumentTemplates,
  DocumentTemplatesData,
  DocumentTemplatesPatch,
  DocumentTemplatesQuery,
  DocumentTemplatesService
} from './document-templates.class'

export type { DocumentTemplates, DocumentTemplatesData, DocumentTemplatesPatch, DocumentTemplatesQuery }

export type DocumentTemplatesClientService = Pick<
  DocumentTemplatesService<Params<DocumentTemplatesQuery>>,
  (typeof documentTemplatesMethods)[number]
>

export const documentTemplatesPath = 'document-templates'

export const documentTemplatesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const documentTemplatesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(documentTemplatesPath, connection.service(documentTemplatesPath), {
    methods: documentTemplatesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [documentTemplatesPath]: DocumentTemplatesClientService
  }
}
