// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { DocumentTemplatesService } from './document-templates.class'

// Main data model schema
export const documentTemplatesSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    file_name: Type.String(),
    file_url: Type.String(),
    file_type: Type.String()
  },
  { $id: 'DocumentTemplates', additionalProperties: false }
)
export type DocumentTemplates = Static<typeof documentTemplatesSchema>
export const documentTemplatesValidator = getValidator(documentTemplatesSchema, dataValidator)
export const documentTemplatesResolver = resolve<DocumentTemplates, HookContext<DocumentTemplatesService>>({})

export const documentTemplatesExternalResolver = resolve<
  DocumentTemplates,
  HookContext<DocumentTemplatesService>
>({})

// Schema for creating new entries
export const documentTemplatesDataSchema = Type.Pick(
  documentTemplatesSchema,
  ['title', 'file_name', 'file_url', 'file_type'],
  {
    $id: 'DocumentTemplatesData'
  }
)
export type DocumentTemplatesData = Static<typeof documentTemplatesDataSchema>
export const documentTemplatesDataValidator = getValidator(documentTemplatesDataSchema, dataValidator)
export const documentTemplatesDataResolver = resolve<
  DocumentTemplates,
  HookContext<DocumentTemplatesService>
>({})

// Schema for updating existing entries
export const documentTemplatesPatchSchema = Type.Partial(documentTemplatesSchema, {
  $id: 'DocumentTemplatesPatch'
})
export type DocumentTemplatesPatch = Static<typeof documentTemplatesPatchSchema>
export const documentTemplatesPatchValidator = getValidator(documentTemplatesPatchSchema, dataValidator)
export const documentTemplatesPatchResolver = resolve<
  DocumentTemplates,
  HookContext<DocumentTemplatesService>
>({})

// Schema for allowed query properties
export const documentTemplatesQueryProperties = Type.Pick(documentTemplatesSchema, [
  'id',
  'title',
  'file_name',
  'file_type'
])
export const documentTemplatesQuerySchema = Type.Intersect(
  [
    querySyntax(documentTemplatesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocumentTemplatesQuery = Static<typeof documentTemplatesQuerySchema>
export const documentTemplatesQueryValidator = getValidator(documentTemplatesQuerySchema, queryValidator)
export const documentTemplatesQueryResolver = resolve<
  DocumentTemplatesQuery,
  HookContext<DocumentTemplatesService>
>({})
