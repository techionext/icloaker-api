import { Router } from 'express';

import { DomainCreateControllerIndex } from 'UseCases/Domain/Create';
import { DomainDeleteControllerIndex } from 'UseCases/Domain/Delete';
import { DomainGetControllerIndex } from 'UseCases/Domain/Get';
import { DomainGetByIdControllerIndex } from 'UseCases/Domain/GetById';
import { DomainUpdateControllerIndex } from 'UseCases/Domain/Update';

export const routerDomains = Router();

routerDomains.post('', (req, res) => DomainCreateControllerIndex.handle(req, res));
routerDomains.put('/:id', (req, res) => DomainUpdateControllerIndex.handle(req, res));
routerDomains.delete('/:id', (req, res) => DomainDeleteControllerIndex.handle(req, res));
routerDomains.get('/:id', (req, res) => DomainGetByIdControllerIndex.handle(req, res));
routerDomains.get('', (req, res) => DomainGetControllerIndex.handle(req, res));
