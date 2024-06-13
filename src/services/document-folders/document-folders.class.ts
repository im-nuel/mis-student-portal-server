// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type {
  Id,
  NullableId,
  Paginated,
  PaginationParams,
  Params,
  ServiceInterface
} from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type {
  DocumentFolders,
  DocumentFoldersData,
  DocumentFoldersPatch,
  DocumentFoldersQuery
} from './document-folders.schema'
import { BadRequest, GeneralError } from '@feathersjs/errors'
import _pick from 'lodash/pick'

export type { DocumentFolders, DocumentFoldersData, DocumentFoldersPatch, DocumentFoldersQuery }

export interface DocumentFoldersServiceOptions {
  app: Application
}

export interface DocumentFoldersParams extends Params<DocumentFoldersQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class DocumentFoldersService<ServiceParams extends DocumentFoldersParams = DocumentFoldersParams> {
  constructor(public options: DocumentFoldersServiceOptions) {}

  async find(
    params: ServiceParams & { paginate?: PaginationParams }
  ): Promise<Omit<Paginated<DocumentFolders>, 'total'>> {
    const { query } = params
    if (!query?.folder) {
      throw new BadRequest({
        errors: {
          folder: 'Folder params is required.'
        }
      })
    }

    const imagekit = this.options.app.get('imagekitClient')
    const result = await imagekit.listFiles({
      skip: query?.$skip,
      limit: query?.$limit,
      path: query.folder.toString()
    })

    return {
      skip: 0,
      limit: 0,
      data: result.map((item) => {
        return {
          ..._pick(item, [
            'fileId',
            'fileType',
            'filePath',
            'name',
            'type',
            'size',
            'mime',
            'url',
            'thumbnail'
          ]),
          folder: query.folder as string
        }
      })
    }
  }

  // async get(id: Id, _params?: ServiceParams): Promise<DocumentFolders> {
  //   return {
  //     id: 0,
  //     folder: `A new message with ID: ${id}!`
  //   }
  // }

  // async create(data: DocumentFoldersData, params?: ServiceParams): Promise<DocumentFolders>
  // async create(data: DocumentFoldersData[], params?: ServiceParams): Promise<DocumentFolders[]>
  // async create(
  //   data: DocumentFoldersData | DocumentFoldersData[],
  //   params?: ServiceParams
  // ): Promise<DocumentFolders | DocumentFolders[]> {
  //   if (Array.isArray(data)) {
  //     return Promise.all(data.map((current) => this.create(current, params)))
  //   }

  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // This method has to be added to the 'methods' option to make it available to clients
  // async update(id: NullableId, data: DocumentFoldersData, _params?: ServiceParams): Promise<DocumentFolders> {
  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // async patch(id: NullableId, data: DocumentFoldersPatch, _params?: ServiceParams): Promise<DocumentFolders> {
  //   return {
  //     id: 0,
  //     text: `Fallback for ${id}`,
  //     ...data
  //   }
  // }

  async remove(
    fileId: string,
    _params?: ServiceParams
  ): Promise<{
    fileId: string
  }> {
    const imagekit = this.options.app.get('imagekitClient')

    if (!fileId) {
      throw new BadRequest({
        errors: {
          fileId: 'File id is required'
        }
      })
    }

    await imagekit.deleteFile(fileId)

    return {
      fileId
    }
  }
}

export const getOptions = (app: Application) => {
  return {
    app,
    paginate: app.get('paginate'),
    name: 'document-folders'
  }
}
