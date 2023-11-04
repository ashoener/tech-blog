import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("dashboard/newPost.hbs", { pageSubtitle: "New Post" });
});

export default router;
