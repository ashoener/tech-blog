import { Router } from "express";
import { Post } from "../../../lib/models/index.js";

import { handleError } from "../../../lib/utils.js";
import requireLoggedInApi from "../../../lib/middleware/requireLoggedInApi.js";

const router = Router();

router.use(requireLoggedInApi);

router.post("/", async (req, res) => {
  try {
    const newPost = Post.build({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user.id,
    }); // create a new post
    await newPost.validate(); // validate the post
    await newPost.save({ validate: false }); // save the post to the database
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        author_id: req.session.user.id,
      },
    });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, errors: ["Post not found"] });
    }
    res.json({ success: true, post });
  } catch (err) {
    handleError(err, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        author_id: req.session.user.id,
      },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, errors: ["Post not found"] });
    post.title = req.body.title;
    post.content = req.body.content;
    await post.validate();
    await post.save({ validate: false });
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        author_id: req.session.user.id,
      },
    });
    if (!post)
      return res
        .status(404)
        .json({ success: false, errors: ["Post not found"] });
    await post.destroy();
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
