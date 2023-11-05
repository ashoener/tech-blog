import { Router } from "express";
import { Comment, Post, User } from "../lib/models/index.js";

const router = Router();

router.get("/:id", async (req, res, next) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "author",
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            as: "author",
          },
        ],
      },
    ],
    nest: true,
  });
  if (post)
    return res.render("post", {
      pageSubtitle: post.title,
      post: post.get({ plain: true }),
    });
  next();
});

export default router;
