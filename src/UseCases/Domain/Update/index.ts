import { container } from 'tsyringe';

import { DomainUpdateController } from './DomainUpdate.Controller';
import { DomainUpdateUseCase } from './DomainUpdate.UseCase';

export const DomainUpdateControllerIndex = new DomainUpdateController(container.resolve(DomainUpdateUseCase));
