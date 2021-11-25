var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Usuario.findByPk(id).then(function (user, err) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "senha",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      Usuario.findOne({ where: { email: username } }).then(function (
        user,
        err
      ) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, req.flash("msg", "Usuario não existe!"));
        }

        if (!bcrypt.compareSync(password, user.senha)) {
          return done(null, false, req.flash("msg", "Senha incorreta!"));
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
