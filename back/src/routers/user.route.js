import express from "express";

import userService from "../services/user.service";

const router = express.Router();

router.put("/:userId/nickname", async (req, res, next) => {
  const { userId } = req.params;
  const { nickname } = req.body;

  try {
    const user = await userService.modifyNickname(userId, nickname);

    res.status(201).json({
      success: true,
      message: "닉네임 수정 성공",
      result: user,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
