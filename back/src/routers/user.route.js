import express from "express";

import userService from "../services/user.service";
import { userProfileImageUpload } from "../middlewares/multer";
import ApiError from '../utils/ApiError';

const router = express.Router();

router.put("/:userId/nickname", async (req, res, next) => {
  const { userId } = req.params;
  const { nickname } = req.body;

  try {
    await userService.checkDuplicatedNickname(nickname);
    await userService.modifyNickname(userId, nickname);

    res.status(201).json({
      success: true,
      message: "닉네임 수정 성공",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/password", async (req, res, next) => {
  const { userId } = req.params;
  const { password, newPassword } = req.body;

  try {
    await userService.checkCorrectPassword(userId, password);
    await userService.modifyPassword(userId, newPassword);

    res.status(201).json({
      success: true,
      message: "비밀번호 수정 성공",
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:userId/profileImage",
  userProfileImageUpload.single("profileImage"),
  async (req, res, next) => {
    if (!req.file) {
      throw ApiError.setBadRequest('이미지 파일을 전송받지 못했습니다.');
    }

    const { userId } = req.params;
    const { location } = req.file;

    try {
      await userService.modifyProfileImage(userId, location);

      res.status(201).json({
        success: true,
        message: "유저 프로필 이미지 변경 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
