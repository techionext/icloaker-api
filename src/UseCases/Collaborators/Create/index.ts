import { container } from 'tsyringe';

import { CreateCollaboratorController } from './CreateCollaborator.Controller';
import { CreateCollaboratorUseCase } from './CreateCollaborator.UseCase';

export const CreateCollaboratorControllerIndex = new CreateCollaboratorController(container.resolve(CreateCollaboratorUseCase));
