import { Router } from "express";
import { Post } from "../../lib/models/index.js";

import { handleError } from "../../lib/utils.js";
import requireLoggedIn from "../../lib/middleware/requireLoggedIn.js";

const router = Router();

router.post("/", requireLoggedIn, async (req, res) => {
  try {
    const newPost = Post.build({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user.id,
    });
    await newPost.validate();
    await newPost.save({ validate: false });
    res.json({ success: true, link: `/posts/${newPost.id}` });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
