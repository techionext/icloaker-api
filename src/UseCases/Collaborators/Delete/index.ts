import { container } from 'tsyringe';

import { DeleteCollaboratorController } from './DeleteCollaborator.Controller';
import { DeleteCollaboratorUseCase } from './DeleteCollaborator.UseCase';

export const DeleteCollaboratorControllerIndex = new DeleteCollaboratorController(container.resolve(DeleteCollaboratorUseCase));
