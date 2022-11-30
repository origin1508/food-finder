import { Router } from "express";
import recipeService from "../services/recipe.service";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const recipes = await recipeService.findAllRecipeInformations();

    res.status(200).json({
      success: true,
      message: "레시피 정보 불러오기 성공",
      result: recipes,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
