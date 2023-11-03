import { Router } from "express";

import requireLoggedOut from "../lib/middleware/requireLoggedOut.js";

const router = Router();

router.get("/", requireLoggedOut, (req, res) => {
  res.render("signup", { pageSubtitle: "Sign Up" });
});

export default router;
