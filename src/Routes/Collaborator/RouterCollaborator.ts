import { Router } from 'express';

import { CollaboratorCreateControllerIndex } from 'UseCases/Collaborator/Create';
import { CollaboratorDeleteControllerIndex } from 'UseCases/Collaborator/Delete';
import { CollaboratorGetControllerIndex } from 'UseCases/Collaborator/Get';
import { CollaboratorUpdateControllerIndex } from 'UseCases/Collaborator/Update';

export const routerCollaborator = Router();

routerCollaborator.post('', (req, res) => CollaboratorCreateControllerIndex.handle(req, res));
routerCollaborator.delete('/:id', (req, res) => CollaboratorDeleteControllerIndex.handle(req, res));
routerCollaborator.get('', (req, res) => CollaboratorGetControllerIndex.handle(req, res));
routerCollaborator.put('/:id', (req, res) => CollaboratorUpdateControllerIndex.handle(req, res));
