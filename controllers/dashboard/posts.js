import { Router } from "express";

import { Post } from "../../lib/models/index.js";

const router = Router();

router.get("/:id", async (req, res, next) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
      author_id: req.session.user.id,
    },
    raw: true,
    nest: true,
  });
  if (post)
    return res.render("dashboard/editPost.hbs", {
      pageSubtitle: "Edit Post",
      post,
    });
  next();
});

export default router;
