import { Router } from "express";
import requireLoggedOut from "../lib/middleware/requireLoggedOut.js";

const router = Router();

router.get("/", requireLoggedOut, (req, res) => {
  res.render("login", { pageSubtitle: "Login" });
});

export default router;
