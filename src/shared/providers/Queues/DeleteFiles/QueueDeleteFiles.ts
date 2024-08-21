import { inject, injectable } from 'tsyringe';

import { env } from '@shared/Util/Env/Env';
import { ZODVerifyParse } from '@shared/Util/ZOD/zod';

import { ISQSService } from '../ISQSConfig';
import { IProductDeleteDTO, IQueueDeleteFiles, IQueueFilesDeleteModel } from './DTO/IQueueFilesDelete';
import { SchemaQueueFilesDelete } from './SchemaQueueFilesDelete';

@injectable()
export class QueueDeleteFiles implements IQueueDeleteFiles {
  private queueUrl: string;

  constructor(@inject('SQSService') private SQSService: ISQSService) {
    this.queueUrl = env.AWS.QUEUE.SERVICES.FILES_DELETE;
  }

  async execute(request: IProductDeleteDTO.Params): Promise<void> {
    // fazer validação se fila conseguiu se conectar, se n conseguiu então mandar para uma outra fila que vai ir com uma tag do nome da fila
    const { key, nameBucket } = ZODVerifyParse({ schema: SchemaQueueFilesDelete, data: request });

    const params: IQueueFilesDeleteModel = {
      key,
      nameBucket,
    };

    await this.SQSService.sendMessage(this.queueUrl, params);
  }
}
