import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { RepositoryUsers } from 'Repositories/User/Postgres/RepositoryUsers';

import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';
import { generateToken } from '@shared/Util/configToken/generateToken';
import { env } from '@shared/Util/Env/Env';
import { ErrorDictionary } from '@shared/Util/ErrorDictionary';

const googleConfig = {
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  prompt: 'none',
};

const repositoryUsers = new RepositoryUsers();

passport.use(
  new GoogleStrategy({ ...googleConfig, callbackURL: env.GOOGLE_CALLBACK_URL_LOGIN }, async (token, tokenSecret, profile, done) => {
    try {
      const { data: dataUser } = await repositoryUsers.GetUserByProvider({ provider: 'GOOGLE', providerId: profile.id });

      const id = handleGenerateUuid();
      if (!dataUser) {
        const { data: dataUserCreated } = await repositoryUsers.CreateWithProvider({
          id,
          provider: 'GOOGLE',
          providerId: profile.id,
          name: profile.displayName,
          providerEmail: profile.emails![0].value,
        });

        const jwtToken = generateToken({ email: dataUserCreated.email, id: dataUserCreated.id });
        return done(null, { user: dataUser, token: jwtToken });
      }

      const jwtToken = generateToken({ email: dataUser.email, id: dataUser.id });
      return done(null, { user: dataUser, token: jwtToken });
    } catch (error) {
      return done(error, false);
    }
  }),
);

passport.use(
  'google-link',
  new GoogleStrategy(
    { ...googleConfig, callbackURL: env.GOOGLE_CALLBACK_URL_LINK, passReqToCallback: true },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const userId = req.query.state as string;
        const { data: user } = await repositoryUsers.GetWithProfiles({ id: userId });

        if (!user) {
          ErrorDictionary.GOOGLE.userNotFound.message, 400, ErrorDictionary.GOOGLE.userNotFound.codeIntern;
        }

        if (user && user.profiles.some((profile) => profile.provider === 'GOOGLE')) {
          throw new AppError(ErrorDictionary.GOOGLE.accountAlreadyLinked.message, 400, ErrorDictionary.GOOGLE.accountAlreadyLinked.codeIntern);
        }

        if (user) {
          await repositoryUsers.CreateProvider({
            id: user.id,
            provider: 'GOOGLE',
            providerId: profile.id,
            providerEmail: profile.emails![0].value,
          });
        }

        return done(null, profile);
      } catch (error) {
        if (error instanceof AppError) {
          return done(error, false, { message: error.message });
        }
        return done(error, false, { message: ErrorDictionary.GOOGLE.errorLinkingAccount.message });
      }
    },
  ),
);

export default passport;
