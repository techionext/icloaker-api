import { container } from 'tsyringe';

import { CollaboratorAcceptInviteController } from './CollaboratorAcceptInvite.Controller';
import { CollaboratorAcceptInviteUseCase } from './CollaboratorAcceptInvite.UseCase';

export const CollaboratorAcceptInviteControllerIndex = new CollaboratorAcceptInviteController(container.resolve(CollaboratorAcceptInviteUseCase));
