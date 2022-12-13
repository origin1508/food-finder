import express from "express";
import authService from "../services/auth.service";
import authorizeRefreshToken from "../middlewares/refreshTokenAuthorization";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [body("email").exists().isEmail(), body("password").exists().isString().isLength({ min: 8 })],
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await authService.checkUser(email, password);
      const accessToken = await authService.generateAccessToken(user.userId);
      const refreshToken = await authService.generateRefreshToken(user.userId);

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
  }
);

router.post(
  "/register",
  [
    body("email").exists().isEmail(),
    body("password").exists().isString().isLength({ min: 8 }),
    body("nickname").exists().isString().isLength({ min: 3 }),
  ],
  async (req, res, next) => {
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
  }
);

router.put(
  "/validation/refresh-token",
  [body("userId").exists().isString()],
  authorizeRefreshToken,
  async (req, res, next) => {
    const { userId } = req.body;
    const refreshToken = req.refreshToken;
    try {
      await authService.verifyRefreshTokenInDB(userId, refreshToken);
      const newAccessToken = await authService.generateAccessToken(userId);
      const newRefreshToken = await authService.generateRefreshToken(userId);

      res.status(201).json({
        success: true,
        message: "새로운 엑세스 토큰, 리프레시 토큰 발급",
        result: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
