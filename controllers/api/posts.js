import { Router } from "express";
import { Post } from "../../lib/models/index.js";

import { handleError } from "../../lib/utils.js";
import requireLoggedIn from "../../lib/middleware/requireLoggedIn.js";

const router = Router();

router.use(requireLoggedIn);

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, errors: ["Post not found"] });
    post.title = req.body.title;
    post.content = req.body.content;
    await post.validate();
    await post.save({ validate: false });
    res.json({ success: true, link: `/posts/${post.id}` });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
