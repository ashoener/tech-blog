import { Router } from "express";
import populateLocals from "../lib/middleware/populateLocals.js";
import { Post, User } from "../lib/models/index.js";
import sequelize from "../config/connection.js";

import requireLoggedIn from "../lib/middleware/requireLoggedIn.js";

const router = Router();

router.use(populateLocals);

router.get("/", requireLoggedIn, async (req, res) => {
  const posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        as: "author",
      },
    ],
    where: {
      author_id: req.session.user.id,
    },
    attributes: ["id", "title", "createdAt"],
    raw: true,
    nest: true,
  });
  res.render("dashboard", { pageSubtitle: "Dashboard", posts });
});

export default router;
