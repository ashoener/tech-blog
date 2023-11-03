import { Router } from "express";
import { User } from "../../../lib/models/index.js";

import { handleError, waitUntil } from "../../../lib/utils.js";

const router = Router();

const minimumTime = 300; // Minimum request time in ms
router.post("/", async (req, res) => {
  if (req.session.loggedIn)
    return res.json({
      success: false,
      errors: ["Already logged in"],
    });
  const startTime = Date.now();
  const newUser = User.build(req.body);
  try {
    await newUser.validate();
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      await waitUntil(startTime + minimumTime);
      return res.json({
        success: false,
        errors: ["Invalid username or password"],
      });
    }
    const isCorrect = await user.validatePassword(req.body.password);
    if (!isCorrect) {
      await waitUntil(startTime + minimumTime);
      return res.json({
        success: false,
        errors: ["Invalid username or password"],
      });
    }
    req.session.loggedIn = true;
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
