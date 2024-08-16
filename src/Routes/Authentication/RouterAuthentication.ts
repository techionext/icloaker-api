import { Router } from 'express';

import { LoginControllerIndex } from 'UseCases/Authentication/Login';
import { SessionControllerIndex } from 'UseCases/Authentication/Sessions';
import { RecoverPasswordIndex } from 'UseCases/Users/RecoverPassword';
import { SendEmailRecoverPasswordIndex } from 'UseCases/Users/SendEmailRecoverPassword';
import { ValidateForgotPasswordIndex } from 'UseCases/Users/ValidateRecoverPasswordId';

import passport from '@shared/providers/Oauth/googleAuth';
import { env } from '@shared/Util/Env/Env';

import { verifyToken } from '../../shared/middlewares/verifyToken';

export const routerAuthentication = Router();

routerAuthentication.post('/login', (req, res) => LoginControllerIndex.handle(req, res));

routerAuthentication.post('/sessions', verifyToken, (req, res) => SessionControllerIndex.handle(req, res));

routerAuthentication.post('/forgot-password', (req, res) => SendEmailRecoverPasswordIndex.handle(req, res));

routerAuthentication.get('/validate-forgot-password/:id', (req, res) => ValidateForgotPasswordIndex.handle(req, res));

routerAuthentication.post('/redefine-password/:id', (req, res) => RecoverPasswordIndex.handle(req, res));

routerAuthentication.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
routerAuthentication.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/error',
  }),
  (req, res) => {
    res.redirect(`${env.GOOGLE_REDIRECT_URL_LOGIN}?token=${req.user.token}`);
  },
);

routerAuthentication.get('/google/link', verifyToken, (req, res, next) => {
  passport.authenticate('google-link', {
    scope: ['profile', 'email'],
    state: req.body.token.id,
  })(req, res, next);
});

routerAuthentication.get(
  '/google/callback/link',
  passport.authenticate('google-link', {
    session: false,
    failureRedirect: '/auth/error',
  }),
  (req, res) => {
    res.redirect(env.GOOGLE_REDIRECT_URL_LINK);
  },
);

routerAuthentication.get('/auth/error', (req, res) => {
  res.status(400).json({
    message: 'Houve um erro ao tentar vincular a conta do Google.',
    codeIntern: 'AUTH002',
  });
});
