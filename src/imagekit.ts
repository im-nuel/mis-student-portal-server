import ImageKit from 'imagekit'
import { Application } from './declarations'
import { createDebug } from '@feathersjs/commons'

declare module './declarations' {
  interface Configuration {
    imagekitClient: ImageKit
  }
}

const debug = createDebug('imagekit')

export const imagekit = (app: Application) => {
  const config = app.get('imagekit')
  const imagekitClient = new ImageKit({
    publicKey: config.private_key,
    privateKey: config.private_key,
    urlEndpoint: config.url_endpoint
  })

  app.set('imagekitClient', imagekitClient)
}
