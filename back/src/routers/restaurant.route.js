import express from "express";
import restaurantService from "../services/restaurant.service";
import authorizeAccessToken from "../middlewares/accessTokenAuthorization";
import validatorErrorChecker from "../middlewares/validationCheck";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/like",
  authorizeAccessToken,
  [
    body("title").isLength({ min: 1 }),
    body("address").isLength({ min: 1 }),
    body("roadAddress").isLength({ min: 1 }),
    body("link").isLength({ min: 1 }).optional({ nullable: true }),
    body("restaurantId").exists().isInt(),
    body("mapX").exists().isFloat(),
    body("mapY").exists().isFloat(),
    validatorErrorChecker,
  ],
  async (req, res, next) => {
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
  }
);

router.delete(
  "/unlike",
  authorizeAccessToken,
  [body("restaurantId").exists().isInt(), validatorErrorChecker],
  async (req, res, next) => {
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
  }
);

export default router;
