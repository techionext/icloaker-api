import { container } from 'tsyringe';

import { CollaboratorGetController } from './CollaboratorGet.Controller';
import { CollaboratorGetUseCase } from './CollaboratorGet.UseCase';

export const CollaboratorGetControllerIndex = new CollaboratorGetController(container.resolve(CollaboratorGetUseCase));
