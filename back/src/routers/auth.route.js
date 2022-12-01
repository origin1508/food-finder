import express from "express";
import authService from "../services/auth.service";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.checkUser(email, password);
    const accessToken = await authService.generateAccessToken(user.userId);
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

router.post("/register", async (req, res, next) => {
  const { email, password, nickname } = req.body;

  try {
    await authService.registerInfo(email, password, nickname);

    res.status(201).json({
      success: true,
      message: "회원가입 성공",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
