import { container } from 'tsyringe';

import { UpdateCollaboratorController } from './UpdateCollaborator.Controller';
import { UpdateCollaboratorUseCase } from './UpdateCollaborator.UseCase';

export const UpdateCollaboratorControllerIndex = new UpdateCollaboratorController(container.resolve(UpdateCollaboratorUseCase));
