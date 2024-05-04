// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { SiteConfig, SiteConfigData, SiteConfigPatch, SiteConfigQuery } from './site-config.schema'

export type { SiteConfig, SiteConfigData, SiteConfigPatch, SiteConfigQuery }

export interface SiteConfigParams extends KnexAdapterParams<SiteConfigQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SiteConfigService<ServiceParams extends Params = SiteConfigParams> extends KnexService<
  SiteConfig,
  SiteConfigData,
  SiteConfigParams,
  SiteConfigPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'site-config'
  }
}
