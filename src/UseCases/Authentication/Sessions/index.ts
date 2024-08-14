import { container } from 'tsyringe';

import { SessionUserController } from './Session.controller';
import { SessionUseCase } from './Session.useCase';

export const SessionControllerIndex = new SessionUserController(container.resolve(SessionUseCase));
