import resolvers from "./resolvers";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function configurePassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        // RETURNS ONLY 1 ARGUMENT
        resolvers.Query.getOneUser({ email }).then(user => {
          if (user === null) {
            return done(null, false);
          }
          if (user.password !== password) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    const safeUser = {
      id: user.id,
      name: user.name
    };
    done(null, safeUser);
  });

  passport.deserializeUser((safeUser, done) => {
    resolvers.Query.getOneUser({ id: safeUser.id }).then(user => {
      let err;
      user === null ? (err = "Error: no such user") : (err = null);
      done(err, safeUser);
    });
  });

  return passport;
}

module.exports = configurePassport;
