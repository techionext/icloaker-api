import { container } from 'tsyringe';

import { CollaboratorUpdateController } from './CollaboratorUpdate.Controller';
import { CollaboratorUpdateUseCase } from './CollaboratorUpdate.UseCase';

export const CollaboratorUpdateControllerIndex = new CollaboratorUpdateController(container.resolve(CollaboratorUpdateUseCase));
