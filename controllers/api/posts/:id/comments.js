import { Router } from "express";
import { Comment } from "../../../../lib/models/index.js";

import { handleError } from "../../../../lib/utils.js";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
  try {
    const newComment = Comment.build({
      content: req.body.content,
      author_id: req.session.user.id,
      post_id: req.params.id,
    });
    await newComment.validate();
    await newComment.save({ validate: false });
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
