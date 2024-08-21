import { container } from 'tsyringe';

import { CollaboratorDeleteController } from './CollaboratorDelete.Controller';
import { CollaboratorDeleteUseCase } from './CollaboratorDelete.UseCase';

export const CollaboratorDeleteControllerIndex = new CollaboratorDeleteController(container.resolve(CollaboratorDeleteUseCase));
