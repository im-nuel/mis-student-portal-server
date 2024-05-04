// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const convertDate = (fieldNames: string | string[]) => async (context: HookContext) => {
  let fields = fieldNames

  if (typeof fieldNames === 'string') {
    fields = [fieldNames]
  }
  for (let field of fields) {
    const prop = context.data && context.data[field]
    if (prop) {
      context.data[field] = context.data[field].slice(0, 19).replace('T', ' ')
    }
  }

  return Promise.resolve(context)
}
