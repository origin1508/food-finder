import express from "express";
import restaurantService from "../services/restaurant.service";
import recipeSearchService from "../services/recipeSearch.service";

const router = express.Router();

router.get("/:searchKeyword", async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  try {
    // const restaurant = await restaurantService.restaurantSearchApiCall(
    //   searchKeyword
    // );
    const searchedRecipe = await recipeSearchService.searchRecipe(
      searchKeyword
    );

    res.status(200).json({
      success: true,
      message: "레시피 검색 성공",
      result: searchedRecipe,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/list/week", async (req, res, next) => {
  try {
    const recipeRanking = await recipeSearchService.recipeRankingOn7days();

    res.status(200).json({
      success: true,
      message: "레시피 불러오기 성공",
      result: recipeRanking,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/list/random", async (req, res, next) => {
  try {
    const randomRecipe = await recipeSearchService.getRandomRecipe();

    res.status(200).json({
      success: true,
      message: "레시피 불러오기 성공",
      result: randomRecipe,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
