import { container } from 'tsyringe';

import { DomainDeleteController } from './DomainDelete.Controller';
import { DomainDeleteUseCase } from './DomainDelete.UseCase';

export const DomainDeleteControllerIndex = new DomainDeleteController(container.resolve(DomainDeleteUseCase));
