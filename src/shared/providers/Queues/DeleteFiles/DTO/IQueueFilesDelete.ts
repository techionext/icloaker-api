import { z } from 'zod';

import { SchemaQueueFilesDelete } from '../SchemaQueueFilesDelete';

export type SchemaIQueueFilesDelete = z.output<typeof SchemaQueueFilesDelete>;

export namespace IProductDeleteDTO {
  export type Params = SchemaIQueueFilesDelete;
}

export interface IQueueFilesDeleteModel {
  key: string;
  nameBucket: string;
}

export interface IQueueDeleteFiles {
  execute(data: IProductDeleteDTO.Params): Promise<void>;
}
