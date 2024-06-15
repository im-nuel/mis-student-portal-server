// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const createOrUpdate = () => async (context: HookContext) => {
  const { app, data, service } = context
  const { id } = data

  if (id) {
    // Check if the item with the given ID exists
    const existingItem = await service.get(id).catch(() => null)

    if (existingItem) {
      // If it exists, patch the item
      context.result = await service.patch(id, data)
    }
  }

  // If it doesn't exist, the normal create method will proceed
  return context
}
