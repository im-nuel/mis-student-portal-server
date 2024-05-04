// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SiteConfigService } from './site-config.class'

// Main data model schema
export const siteConfigSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    value: Type.String()
  },
  { $id: 'SiteConfig', additionalProperties: false }
)
export type SiteConfig = Static<typeof siteConfigSchema>
export const siteConfigValidator = getValidator(siteConfigSchema, dataValidator)
export const siteConfigResolver = resolve<SiteConfig, HookContext<SiteConfigService>>({})

export const siteConfigExternalResolver = resolve<SiteConfig, HookContext<SiteConfigService>>({})

// Schema for creating new entries
export const siteConfigDataSchema = Type.Pick(siteConfigSchema, ['name', 'value'], {
  $id: 'SiteConfigData'
})
export type SiteConfigData = Static<typeof siteConfigDataSchema>
export const siteConfigDataValidator = getValidator(siteConfigDataSchema, dataValidator)
export const siteConfigDataResolver = resolve<SiteConfig, HookContext<SiteConfigService>>({})

// Schema for updating existing entries
export const siteConfigPatchSchema = Type.Partial(siteConfigSchema, {
  $id: 'SiteConfigPatch'
})
export type SiteConfigPatch = Static<typeof siteConfigPatchSchema>
export const siteConfigPatchValidator = getValidator(siteConfigPatchSchema, dataValidator)
export const siteConfigPatchResolver = resolve<SiteConfig, HookContext<SiteConfigService>>({})

// Schema for allowed query properties
export const siteConfigQueryProperties = Type.Pick(siteConfigSchema, ['id', 'name', 'value'])
export const siteConfigQuerySchema = Type.Intersect(
  [
    querySyntax(siteConfigQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SiteConfigQuery = Static<typeof siteConfigQuerySchema>
export const siteConfigQueryValidator = getValidator(siteConfigQuerySchema, queryValidator)
export const siteConfigQueryResolver = resolve<SiteConfigQuery, HookContext<SiteConfigService>>({})
