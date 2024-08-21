import { container } from 'tsyringe';

import { DomainCreateController } from './DomainCreate.Controller';
import { DomainCreateUseCase } from './DomainCreate.UseCase';

export const DomainCreateControllerIndex = new DomainCreateController(container.resolve(DomainCreateUseCase));
