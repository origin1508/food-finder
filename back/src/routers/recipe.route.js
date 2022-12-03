import { Router } from "express";
import recipeService from "../services/recipe.service";
import authorizeJWT from "../middlewares/JWTauthorization";
import { recipeImageUpload } from "../middlewares/multer";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const recipes = await recipeService.findAllRecipeInformations();

    res.status(200).json({
      success: true,
      message: "레시피 정보 리스트 불러오기 성공",
      result: recipes,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authorizeJWT,
  recipeImageUpload("recipeImages").fields([
    { name: "recipeThumbnail", maxCount: 1 },
    { name: "stepImages" },
  ]),
  async (req, res, next) => {
    try {
      const { userId } = req;

      const createdRecipe = await recipeService.addRecipe({
        ...req.body,
        userId,
        thumbnailUrl: req.files["recipeThumbnail"][0].location,
        stepImages: req.files["stepImages"],
      });

      res.status(201).json({
        success: true,
        message: "레시피 생성 성공",
        result: createdRecipe,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
