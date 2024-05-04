// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const convertBoolean = (fieldNames: string | string[]) => async (context: HookContext) => {
  let fields = fieldNames

  if (typeof fieldNames === 'string') {
    fields = [fieldNames]
  }

  for (let field of fields) {
    if (context.type === 'before') {
      const prop = context.data && context.data[field]
      if (typeof prop !== 'undefined') {
        context.data[field] = Boolean(context.data[field]).toString()
      }
    } else if (context.type === 'after') {
      const prop = context.result && context.result[field]
      if (typeof prop !== 'undefined') {
        context.result[field] = context.result[field] === 'true'
      }
    }
  }

  return Promise.resolve(context)
}
