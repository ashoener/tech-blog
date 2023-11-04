import { Router } from "express";
import populateLocals from "../lib/middleware/populateLocals.js";
import { Post, User } from "../lib/models/index.js";
import sequelize from "../config/connection.js";

const router = Router();

router.use(populateLocals);

router.get("/", async (req, res) => {
  const posts = (
    await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "author",
        },
      ],
      attributes: [
        "title",
        "createdAt",
        [
          sequelize.fn("SUBSTRING", sequelize.col("content"), 1, 256),
          "content",
        ],
        [sequelize.fn("LENGTH", sequelize.col("content")), "content_length"],
      ],
      limit: 5,
      raw: true,
      nest: true,
    })
  ).map((p) => ({
    ...p,
    content: p.content + (p.content.length < p.content_length ? "..." : ""),
  }));
  console.log(posts);
  res.render("index", { pageSubtitle: "Home", posts });
});

export default router;
