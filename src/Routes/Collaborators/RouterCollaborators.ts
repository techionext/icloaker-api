import { Router } from 'express';

import { CreateCollaboratorControllerIndex } from 'UseCases/Collaborators/Create';
import { DeleteCollaboratorControllerIndex } from 'UseCases/Collaborators/Delete';
import { GetCollaboratorsControllerIndex } from 'UseCases/Collaborators/Get';
import { UpdateCollaboratorControllerIndex } from 'UseCases/Collaborators/Update';

export const routerCollaborator = Router();

routerCollaborator.post('', (req, res) => CreateCollaboratorControllerIndex.handle(req, res));
routerCollaborator.delete('/:id', (req, res) => DeleteCollaboratorControllerIndex.handle(req, res));
routerCollaborator.get('', (req, res) => GetCollaboratorsControllerIndex.handle(req, res));
routerCollaborator.put('/:id', (req, res) => UpdateCollaboratorControllerIndex.handle(req, res));
