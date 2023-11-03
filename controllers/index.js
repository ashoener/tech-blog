import { Router } from "express";
import populateLocals from "../lib/middleware/populateLocals.js";

const router = Router();

router.use(populateLocals);

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
