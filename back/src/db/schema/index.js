/**
 * 관계 정의 및 스키마 export
 * 해당 모듈에서 export된 스키마 객체는 model에서 사용
 */
import User from "./user.schema";
// import Recipe from './recipe.schema';

/**
 * 관계 정의 예시
 * User와 Recipe는 1 : N 관계
 * 
 * foreignKey의 user_id는 Recipe 테이블에 생기는 foreignKey
 * sourceKey와 targetKey의 user_id는 User의 기본키
 */

// User.hasMany(Recipe, {foreignKey: "user_id", sourceKey: 'user_id'});
// Recipe.belongsTo(User, {foreignKey: 'user_id', targetKey: 'user_id'})


export { User };
