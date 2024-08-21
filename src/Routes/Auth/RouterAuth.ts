import { Router } from 'express';

import { AuthLoginControllerIndex } from 'UseCases/Auth/Login';
import { AuthSessionControllerIndex } from 'UseCases/Auth/Sessions';

import passport from '@shared/providers/Oauth/googleAuth';
import { env } from '@shared/Util/Env/Env';

import { verifyToken } from '../../shared/middlewares/verifyToken';

export const routerAuth = Router();

routerAuth.post('/login', (req, res) => AuthLoginControllerIndex.handle(req, res));

routerAuth.post('/session', verifyToken, (req, res) => AuthSessionControllerIndex.handle(req, res));

routerAuth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);
routerAuth.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/oauth/error' }), (req, res) => {
  const token = (req.user as any).token;
  res.redirect(`${env.URLS.FRONT_END_BASE_URL}/oauth/success?token=${token}`);
});

routerAuth.get('/google/sync', verifyToken, (req, res, next) => {
  passport.authenticate('google-sync', {
    scope: ['profile', 'email'],
    state: req.body.token.id,
  })(req, res, next);
});

routerAuth.get(
  '/google/callback/sync',
  passport.authenticate('google-sync', {
    session: false,
    failureRedirect: '/oauth/error',
  }),
  (req, res) => {
    res.redirect(env.OAUTH.GOOGLE.LINKS.SYNC.REDIRECT);
  },
);

routerAuth.get('/oauth/error', (req, res) => {
  res.status(400).json({
    message: 'Houve um erro ao tentar vincular a conta do Google.',
    codeIntern: 'AUTH002',
  });
});
