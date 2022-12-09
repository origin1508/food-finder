import { Router } from "express";
import recipeService from "../services/recipe.service";
import authorizeAccessToken from "../middlewares/accessTokenAuthorization";
import { recipeImageUpload } from "../middlewares/multer";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { method, category, lastRecipeId, limit } = req.query;
    const recipes = await recipeService.findAllRecipeInformations({
      method,
      category,
      lastRecipeId,
      limit,
    });

    res.status(200).json({
      success: true,
      message: "레시피 정보 리스트 불러오기 성공",
      result: recipes,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:recipeId", authorizeAccessToken, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req;
    const recipe = await recipeService.findRecipeDetail({
      dishId: recipeId,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "레시피 디테일 정보 불러오기 성공",
      result: recipe,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authorizeAccessToken,
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

router.post(
  "/:recipeId/steps",
  authorizeAccessToken,
  recipeImageUpload("recipeImages").single("stepImage"),
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;
      const location = req?.file?.location;

      const createdStep = await recipeService.addStep({
        ...req.body,
        userId,
        dishId: recipeId,
        imageUrl: location,
      });

      res.status(201).json({
        success: true,
        message: "스텝 추가 성공",
        result: createdStep,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:recipeId/comments",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;

      const createdComment = await recipeService.addComment({
        ...req.body,
        userId,
        dishId: recipeId,
      });

      res.status(201).json({
        success: true,
        message: "댓글 추가 성공",
        result: createdComment,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:recipeId/likes",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;

      const createdLike = await recipeService.addLike({
        userId,
        dishId: recipeId,
      });

      res.status(201).json({
        success: true,
        message: "좋아요 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:recipeId/stars",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;

      const createdStar = await recipeService.addStar({
        userId,
        dishId: recipeId,
        ...req.body,
      });

      res.status(201).json({
        success: true,
        message: "별점 등록 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:recipeId",
  authorizeAccessToken,
  recipeImageUpload("recipeImages").single("recipeThumbnail"),
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;
      const location = req?.file?.location;

      const updatedRecipeInformation =
        await recipeService.updateRecipeInformation({
          userId,
          dishId: recipeId,
          recipeThumbnail: location,
          ...req.body,
        });

      res.status(200).json({
        success: true,
        message: "레시피 정보 업데이트 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:recipeId/steps/:stepId",
  authorizeAccessToken,
  recipeImageUpload("recipeImages").single("stepImage"),
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId, stepId } = req.params;
      const location = req?.file?.location;

      const updatedStep = await recipeService.updateStep({
        dishId: recipeId,
        userId,
        stepId,
        imageUrl: location,
        ...req.body,
      });

      res.status(200).json({
        success: true,
        message: "스텝 업데이트 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/comments/:commentId",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { userId } = req;

      const updatedComment = await recipeService.updateComment({
        commentId,
        userId,
        ...req.body,
      });

      res.status(200).json({
        success: true,
        message: "댓글 업데이트 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:recipeId", authorizeAccessToken, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req;

    const deletedRecipe = await recipeService.deleteRecipe({
      userId,
      dishId: recipeId,
    });

    res.status(200).json({
      success: true,
      message: "레시피 삭제 성공",
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/comments/:commentId",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { userId } = req;

      const deletedRecipe = await recipeService.deleteComment({
        userId,
        commentId,
      });

      res.status(200).json({
        success: true,
        message: "댓글 삭제 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:recipeId/likes",
  authorizeAccessToken,
  async (req, res, next) => {
    try {
      const { userId } = req;
      const { recipeId } = req.params;

      const deletedLike = await recipeService.deleteLike({
        userId,
        dishId: recipeId,
      });

      res.status(200).json({
        success: true,
        message: "좋아요 취소 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
