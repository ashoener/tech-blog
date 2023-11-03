import { Router } from "express";
import { User } from "../../../lib/models/index.js";

import { handleError, waitUntil } from "../../../lib/utils.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return handleError(err, res);
      res.json({ success: true });
    });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
