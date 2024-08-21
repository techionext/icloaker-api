import { container } from 'tsyringe';

import { CollaboratorCreateController } from './CollaboratorCreate.Controller';
import { CollaboratorCreateUseCase } from './CollaboratorCreate.UseCase';

export const CollaboratorCreateControllerIndex = new CollaboratorCreateController(container.resolve(CollaboratorCreateUseCase));
