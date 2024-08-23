import { Router } from 'express';

import { CollaboratorDeleteControllerIndex } from 'UseCases/Collaborator/Delete';
import { CollaboratorGetControllerIndex } from 'UseCases/Collaborator/Get';
import { CollaboratorUpdateControllerIndex } from 'UseCases/Collaborator/Update';

export const routerCollaborator = Router();

routerCollaborator.delete('/:id', (req, res) => CollaboratorDeleteControllerIndex.handle(req, res));
routerCollaborator.get('', (req, res) => CollaboratorGetControllerIndex.handle(req, res));
routerCollaborator.put('/:id', (req, res) => CollaboratorUpdateControllerIndex.handle(req, res));
