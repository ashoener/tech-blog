import { Router } from "express";
import { Post, User } from "../../lib/models/index.js";

import requireLoggedIn from "../../lib/middleware/requireLoggedIn.js";

const router = Router();

router.use(requireLoggedIn);

router.get("/", async (req, res) => {
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
