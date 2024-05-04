// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  DocumentTemplates,
  DocumentTemplatesData,
  DocumentTemplatesPatch,
  DocumentTemplatesQuery
} from './document-templates.schema'

export type { DocumentTemplates, DocumentTemplatesData, DocumentTemplatesPatch, DocumentTemplatesQuery }

export interface DocumentTemplatesParams extends KnexAdapterParams<DocumentTemplatesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DocumentTemplatesService<
  ServiceParams extends Params = DocumentTemplatesParams
> extends KnexService<
  DocumentTemplates,
  DocumentTemplatesData,
  DocumentTemplatesParams,
  DocumentTemplatesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'document-templates'
  }
}
