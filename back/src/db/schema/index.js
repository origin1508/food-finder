/**
 * 관계 정의 및 스키마 export
 * 해당 모듈에서 export된 스키마 객체는 model에서 사용
 */
import User from "./user.schema";
import Recipe from "./recipe.schema";
import Step from "./step.schema";
import RecipeComment from "./recipe_comment.schema";
import RecipeStar from "./recipe_star.schema";
import RecipeLike from "./recipe_like.schema";
import Restaurant from "./resturant.schema";

/**
 * 관계 정의 예시
 * User와 Recipe는 1 : N 관계
 *
 * foreignKey의 user_id는 Recipe 테이블에 생기는 foreignKey
 * sourceKey와 targetKey의 user_id는 User의 기본키
 */

// Recipe
User.hasMany(Recipe, { foreignKey: "user_id", sourceKey: "user_id" });
Recipe.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });

// Step
Recipe.hasMany(Step, { foreignKey: "dish_id", sourceKey: "dish_id" });
Step.belongsTo(Recipe, { foreignKey: "dish_id", targetKey: "dish_id" });

// Restaurant
User.hasMany(Restaurant, { foreignKey: "user_id", sourceKey: "user_id" });
Restaurant.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });

// RecipeStar
User.hasMany(RecipeStar, { foreignKey: "user_id", sourceKey: "user_id" });
RecipeStar.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });

Recipe.hasMany(RecipeStar, { foreignKey: "dish_id", sourceKey: "dish_id" });
RecipeStar.belongsTo(Recipe, { foreignKey: "dish_id", targetKey: "dish_id" });

// RecipeComment
User.hasMany(RecipeComment, { foreignKey: "user_id", sourceKey: "user_id" });
RecipeComment.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });

Recipe.hasMany(RecipeComment, { foreignKey: "dish_id", sourceKey: "dish_id" });
RecipeComment.belongsTo(Recipe, {
  foreignKey: "dish_id",
  targetKey: "dish_id",
});

//RecipeLike
User.hasMany(RecipeLike, { foreignKey: "user_id", sourceKey: "user_id" });
RecipeLike.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });

Recipe.hasMany(RecipeLike, { foreignKey: "dish_id", sourceKey: "dish_id" });
RecipeLike.belongsTo(Recipe, { foreignKey: "dish_id", targetKey: "dish_id" });

export {
  User,
  Recipe,
  RecipeLike,
  RecipeComment,
  RecipeStar,
  Restaurant,
  Step,
};
