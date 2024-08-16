import { container } from 'tsyringe';

import { DomainGetController } from './DomainGet.Controller';
import { DomainGetUseCase } from './DomainGet.UseCase';

export const DomainGetControllerIndex = new DomainGetController(container.resolve(DomainGetUseCase));
