import express from "express";

import userService from "../services/user.service";
import { userProfileImageUpload } from "../middlewares/multer";
import ApiError from "../utils/ApiError";
import authorizeJWT from "../middlewares/JWTauthorization";

const router = express.Router();

router.put("/:userId/nickname", authorizeJWT, async (req, res, next) => {
  const { userId } = req.params;
  const { nickname } = req.body;

  try {
    await userService.checkDuplicatedNickname(nickname);
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

router.put("/:userId/password", authorizeJWT, async (req, res, next) => {
  const { userId } = req.params;
  const { password, newPassword } = req.body;

  try {
    await userService.checkCorrectPassword(userId, password);
    const user = await userService.modifyPassword(userId, newPassword);

    res.status(201).json({
      success: true,
      message: "비밀번호 수정 성공",
      result: user,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:userId/profileImage",
  authorizeJWT,
  userProfileImageUpload.single("profileImage"),
  async (req, res, next) => {
    if (!req.file) {
      throw ApiError.setBadRequest("이미지 파일을 전송받지 못했습니다.");
    }

    const { userId } = req.params;
    const { location } = req.file;

    try {
      const user = await userService.modifyProfileImage(userId, location);

      res.status(201).json({
        success: true,
        message: "유저 프로필 이미지 변경 성공",
        result: user,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:userId/recipes", authorizeJWT, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const recipes = await userService.getRecipes(userId);

    res.status(200).json({
      success: true,
      message: "내가 작성한 레시피 목록 조회 성공",
      result: recipes,
    });
  } catch (err) {
    next(err);
  }
});

// router.get("/:userId/like/recipes", async (req, res, next) => {
//   const {userId} = req.params;

//   try {
//     const recipes = await userService
//   }
// });

router.get("/:userId/like/restaurant", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const restaurants = await userService.getRestaurants(userId);

    res.status(200).json({
      success: true,
      message: "북마크한 맛집 목록 조회 성공",
      result: restaurants,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
