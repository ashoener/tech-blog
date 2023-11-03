/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.user = req.session.user || { id: 0, username: "" };
  res.locals.pageTitle = "Tech Blog";
  res.locals.currentPage = req.path;
  res.locals.links = [
    {
      title: "Home",
      path: "/",
      currentPage: req.path,
    },
  ];
  if (req.session.loggedIn) {
    res.locals.links.push(
      {
        title: "Dashboard",
        path: "/dashboard",
        currentPage: req.path,
      },
      {
        title: "Logout",
        path: "/logout",
        currentPage: req.path,
      }
    );
  } else {
    res.locals.links.push({
      title: "Login",
      path: "/login",
      currentPage: req.path,
    });
  }
  next();
};
