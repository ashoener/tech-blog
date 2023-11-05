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
    }); // build a new comment
    await newComment.validate(); // validate the comment
    await newComment.save({ validate: false }); // save the comment to the database
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
