import express from "express";
import restaurantService from "../services/restaurant.service";
import authorizeJWT from "../middlewares/JWTauthorization";

const router = express.Router();

router.post("/like", authorizeJWT, async (req, res, next) => {
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

router.delete("/unlike", authorizeJWT, async (req, res, next) => {
  const userId = req.userId;
  const { title } = req.body;

  try {
    await restaurantService.restaurantUnlike(userId, title);

    res.status(200).json({
      success: true,
      message: "맛집 즐겨찾기 해제 성공",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
