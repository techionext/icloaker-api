import { Router } from 'express';

import { UserAddLocalCredentialsControllerIndex } from 'UseCases/User/AddLocalCredentials';
import { UserConfirmPasswordChangeControllerIndex } from 'UseCases/User/ConfirmPasswordChange';
import { UserCreateControllerIndex } from 'UseCases/User/Create';
import { UserDeleteAvatarControllerIndex } from 'UseCases/User/DeleteAvatar';
import { UserGetByIdControllerIndex } from 'UseCases/User/GetById';
import { UserRequestPasswordChangeControllerIndex } from 'UseCases/User/RequestPasswordChange';
import { UserUpdateControllerIndex } from 'UseCases/User/Update';
import { UserUpdateAvatarControllerIndex } from 'UseCases/User/UpdateAvatar';
import { UserValidateForgotPasswordControllerIndex } from 'UseCases/User/ValidatePasswordChange';

import { SizeLimitUpload } from '@shared/features/LimitsFiles';
import { UploadFilesMulter } from '@shared/middlewares/UploadFilesMulter';
import { verifyToken } from '@shared/middlewares/verifyToken';

export const routerUser = Router();

routerUser.post('', (req, res) => UserCreateControllerIndex.handle(req, res));

routerUser.post('/forgot-password', (req, res) => UserRequestPasswordChangeControllerIndex.handle(req, res));

routerUser.get('/forgot-password/:id', (req, res) => UserValidateForgotPasswordControllerIndex.handle(req, res));

routerUser.post('/redefine-password/:id', (req, res) => UserConfirmPasswordChangeControllerIndex.handle(req, res));

routerUser.post('/credentials', verifyToken, (req, res) => UserAddLocalCredentialsControllerIndex.handle(req, res));

routerUser.get('/:id', verifyToken, (req, res) => UserGetByIdControllerIndex.handle(req, res));

routerUser.put('/:id', verifyToken, (req, res) => UserUpdateControllerIndex.handle(req, res));

routerUser.patch(
  '/:id',
  UploadFilesMulter({
    sizeLimite: SizeLimitUpload.AVATAR_IMAGE,
    nameField: 'avatar',
    type_image: 'single',
    allowedMimes: ['image/jpeg', 'image/png'],
  }),
  verifyToken,
  (req, res) => UserUpdateAvatarControllerIndex.handle(req, res),
);

routerUser.delete('/:id', verifyToken, (req, res) => UserDeleteAvatarControllerIndex.handle(req, res));
