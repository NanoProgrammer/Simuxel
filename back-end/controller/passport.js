import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../model/postgres/db.js';

const userModel = new UserModel();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: 'https://simuxel.onrender.com/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await userModel.findByEmail(email);

    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email,
        password: null,
        provider: 'google',
        role: 'user',
      });
    }

    return done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
