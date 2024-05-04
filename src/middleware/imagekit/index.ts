import { createDebug } from '@feathersjs/commons'
import { Application, Middleware } from '@feathersjs/koa'

const debug = createDebug('ImageKit')

const serviceMiddleware = (): Middleware => {
  return async (ctx, next) => {
    const { search, path } = ctx.request
    debug(search)
    next()
  }
}

export const imagekit = () => {
  return (app: Application) => {
    app.use(serviceMiddleware())
  }
}
