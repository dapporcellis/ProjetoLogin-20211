exports.autenticacao = function autenticacao() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    //console.log(req);
    req.flash("site", req._parsedUrl.path);
    req.flash("msg", "Você deve se logar para acessar esse link!");
    res.redirect("/admin");
  };
};
