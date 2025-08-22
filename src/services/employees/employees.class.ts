// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Employee, EmployeeData, EmployeePatch, EmployeeQuery } from './employees.schema'

export type { Employee, EmployeeData, EmployeePatch, EmployeeQuery }

export interface EmployeeParams extends KnexAdapterParams<EmployeeQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class EmployeeService<ServiceParams extends Params = EmployeeParams> extends KnexService<
  Employee,
  EmployeeData,
  EmployeeParams,
  EmployeePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'employees'   // <-- nama tabel di database
  }
}