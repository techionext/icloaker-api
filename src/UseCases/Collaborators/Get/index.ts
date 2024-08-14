import { container } from 'tsyringe';

import { GetCollaboratorsController } from './GetCollaborators.Controller';
import { GetCollaboratorsUseCase } from './GetCollaborators.UseCase';

export const GetCollaboratorsControllerIndex = new GetCollaboratorsController(container.resolve(GetCollaboratorsUseCase));
