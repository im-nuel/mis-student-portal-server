// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { DocumentFoldersService } from './document-folders.class'

// Main data model schema
export const documentFoldersSchema = Type.Object(
  {
    fileId: Type.String(),
    fileType: Type.String(),
    filePath: Type.String(),

    name: Type.String(),
    type: Type.String(),
    size: Type.Number(),
    mime: Type.Optional(Type.String()),

    url: Type.String(),
    thumbnail: Type.String(),

    folder: Type.String()
  },
  { $id: 'DocumentFolders', additionalProperties: false }
)
export type DocumentFolders = Static<typeof documentFoldersSchema>
export const documentFoldersValidator = getValidator(documentFoldersSchema, dataValidator)
export const documentFoldersResolver = resolve<DocumentFolders, HookContext<DocumentFoldersService>>({})

export const documentFoldersExternalResolver = resolve<DocumentFolders, HookContext<DocumentFoldersService>>(
  {}
)

// Schema for creating new entries
export const documentFoldersDataSchema = Type.Pick(documentFoldersSchema, [], {
  $id: 'DocumentFoldersData'
})
export type DocumentFoldersData = Static<typeof documentFoldersDataSchema>
export const documentFoldersDataValidator = getValidator(documentFoldersDataSchema, dataValidator)
export const documentFoldersDataResolver = resolve<DocumentFolders, HookContext<DocumentFoldersService>>({})

// Schema for updating existing entries
export const documentFoldersPatchSchema = Type.Partial(documentFoldersSchema, {
  $id: 'DocumentFoldersPatch'
})
export type DocumentFoldersPatch = Static<typeof documentFoldersPatchSchema>
export const documentFoldersPatchValidator = getValidator(documentFoldersPatchSchema, dataValidator)
export const documentFoldersPatchResolver = resolve<DocumentFolders, HookContext<DocumentFoldersService>>({})

// Schema for allowed query properties
export const documentFoldersQueryProperties = Type.Pick(documentFoldersSchema, ['folder'])
export const documentFoldersQuerySchema = Type.Intersect(
  [
    querySyntax(documentFoldersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocumentFoldersQuery = Static<typeof documentFoldersQuerySchema>
export const documentFoldersQueryValidator = getValidator(documentFoldersQuerySchema, queryValidator)
export const documentFoldersQueryResolver = resolve<
  DocumentFoldersQuery,
  HookContext<DocumentFoldersService>
>({})
