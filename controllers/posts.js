import { Router } from "express";
import { Post, User } from "../lib/models/index.js";

const router = Router();

router.get("/:id", async (req, res, next) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "author",
      },
    ],
    raw: true,
    nest: true,
  });
  if (post) return res.render("post", { pageSubtitle: post.title, post });
  next();
});

export default router;
