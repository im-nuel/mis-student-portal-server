import { TSchema, Type } from '@feathersjs/typebox'

export const typeboxNullable = <T extends TSchema>(item: T[]) => {
  return Type.Union([Type.Null(), ...item])
}
