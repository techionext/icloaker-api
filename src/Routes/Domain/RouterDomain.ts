import { Router } from 'express';

import { DomainCreateControllerIndex } from 'UseCases/Domain/Create';
import { DomainDeleteControllerIndex } from 'UseCases/Domain/Delete';
import { DomainGetControllerIndex } from 'UseCases/Domain/Get';
import { DomainGetByIdControllerIndex } from 'UseCases/Domain/GetById';
import { DomainUpdateControllerIndex } from 'UseCases/Domain/Update';

export const routerDomain = Router();

routerDomain.post('', (req, res) => DomainCreateControllerIndex.handle(req, res));
routerDomain.put('/:id', (req, res) => DomainUpdateControllerIndex.handle(req, res));
routerDomain.delete('/:id', (req, res) => DomainDeleteControllerIndex.handle(req, res));
routerDomain.get('/:id', (req, res) => DomainGetByIdControllerIndex.handle(req, res));
routerDomain.get('', (req, res) => DomainGetControllerIndex.handle(req, res));
