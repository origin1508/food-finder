import express from "express";
import restaurantService from "../services/restaurant.service";
import recipeSearchService from "../services/recipeSearch.service";

const router = express.Router();

router.get("/:searchKeyword", async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  try {
    const restaurant = await restaurantService.RestaurantSearchApiCall(
      searchKeyword
    );
    const searchedRecipe = await recipeSearchService;

    res.status(200).json({
      success: true,
      message: "레시피 검색 성공",
      result: { restaurant },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
