import { container } from 'tsyringe';

import { CollaboratorSendInviteController } from './CollaboratorSendInvite.Controller';
import { CollaboratorSendInviteUseCase } from './CollaboratorSendInvite.UseCase';

export const CollaboratorSendInviteControllerIndex = new CollaboratorSendInviteController(container.resolve(CollaboratorSendInviteUseCase));
