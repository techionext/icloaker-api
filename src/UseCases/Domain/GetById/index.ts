import { container } from 'tsyringe';

import { DomainGetByIdController } from './DomainGetById.Controller';
import { DomainGetByIdUseCase } from './DomainGetById.UseCase';

export const DomainGetByIdControllerIndex = new DomainGetByIdController(container.resolve(DomainGetByIdUseCase));
