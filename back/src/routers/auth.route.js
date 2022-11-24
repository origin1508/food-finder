import express from "express";

import authService from "../services/auth.service";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.checkUser(email, password);

    const accessToken = await authService.generateAccessToken(user.user_id);
    const refreshToken = await authService.generateRefreshToken();

    res.status(200).json({
      success: true,
      message: "로그인 성공",
      result: {
        accessToken,
        refreshToken,
        ...user,
      },
    });
  } catch (err) {
    next(err);
  }
});
