import express from "express";
import restaurantService from "../services/restaurant.service";
import authorizeAccessToken from "../middlewares/accessTokenAuthorization";

const router = express.Router();

router.post("/like", authorizeAccessToken, async (req, res, next) => {
  const userId = req.userId;
  const restaurantInfo = req.body;

  try {
    await restaurantService.restaurantLike(userId, restaurantInfo);

    res.status(200).json({
      success: true,
      message: "맛집 즐겨찾기 성공",
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/unlike", authorizeAccessToken, async (req, res, next) => {
  const userId = req.userId;
  const { restaurantId } = req.body;

  try {
    await restaurantService.restaurantUnlike(userId, restaurantId);

    res.status(200).json({
      success: true,
      message: "맛집 즐겨찾기 해제 성공",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
