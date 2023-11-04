import { Router } from "express";
import populateLocals from "../lib/middleware/populateLocals.js";
import { Post } from "../lib/models/index.js";

const router = Router();

router.use(populateLocals);

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
    raw: true,
  });
  res.render("index", { pageSubtitle: "Home", posts });
});

export default router;
