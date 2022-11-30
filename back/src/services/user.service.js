import userModel from "../db/model/user.model";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import recipeModel from "../db/model/recipe.model";
import restaurantModel from '../db/model/restaurant.model';

export default {
  async modifyNickname(userId, nickname) {
    await userModel.updateNickname(userId, nickname);
    const user = await userModel.findById(userId);

    return {
      userId: user.user_id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profile_url,
    };
  },

  async checkDuplicatedNickname(nickname) {
    const duplicatedUser = await userModel.findByNickname(nickname);
    if (duplicatedUser) {
      throw ApiError.setBadRequest("중복된 닉네임이 존재합니다.");
    }
  },

  async modifyPassword(userId, password) {
    const encryptedPassword = await bcrypt.hash(password, 12);
    await userModel.updatePassword(userId, encryptedPassword);

    const user = await userModel.findById(userId);

    return {
      userId: user.user_id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profile_url,
    };
  },

  async checkCorrectPassword(userId, password) {
    const user = await userModel.findById(userId);

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw ApiError.setBadRequest("일치하지 않는 비밀번호입니다.");
    }
  },

  async modifyProfileImage(userId, location) {
    await userModel.updateProfileImage(userId, location);
    const user = await userModel.findById(userId);

    return {
      userId: user.user_id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profile_url,
    };
  },
  
  // 아래 서비스는
  // 페이지네이션 상의 후에 코드 수정
  async getRecipes(userId) {
    const recipes = await recipeModel.findAllByUserId(userId);

    return recipes;
  },

  // async getLikeRecipes(userId) {
  //   const recipes = await recipeModel.
  // },

  async getRestaurants(userId) {
    const restaurants = await restaurantModel.findAllByUserId(userId);

    return restaurants;
  }
};
