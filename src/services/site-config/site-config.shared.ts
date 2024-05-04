// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  SiteConfig,
  SiteConfigData,
  SiteConfigPatch,
  SiteConfigQuery,
  SiteConfigService
} from './site-config.class'

export type { SiteConfig, SiteConfigData, SiteConfigPatch, SiteConfigQuery }

export type SiteConfigClientService = Pick<
  SiteConfigService<Params<SiteConfigQuery>>,
  (typeof siteConfigMethods)[number]
>

export const siteConfigPath = 'site-config'

export const siteConfigMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const siteConfigClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(siteConfigPath, connection.service(siteConfigPath), {
    methods: siteConfigMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [siteConfigPath]: SiteConfigClientService
  }
}
