import axios from "axios";
import dotenv from "dotenv";
import ApiError from "../utils/ApiError";
import restaurantModel from "../db/model/restaurant.model";

dotenv.config();

export default {
  async restaurantSearchApiCall(searchKeyword) {
    const ApiSearchResult = await axios.get(
      "https://openapi.naver.com/v1/search/local.json",
      {
        params: { query: searchKeyword, display: 5, sort: "random" },
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_SECRET_KEY,
        },
      }
    );

    const restaurant = ApiSearchResult.data.items;

    return restaurant;
  },

  async restaurantLike(userId, restaurantInfo) {
    const { title } = restaurantInfo;
    const checkRestaurantLikeList = await restaurantModel.findByTitle(
      userId,
      title
    );
    if (checkRestaurantLikeList) {
      throw ApiError.setBadRequest("이미 존재하는 즐겨찾기입니다.");
    }

    await restaurantModel.creatLike(userId, restaurantInfo);
  },

  async restaurantUnlike(userId, title) {
    const checkRestaurantLikeList = await restaurantModel.findByTitle(
      userId,
      title
    );
    if (!checkRestaurantLikeList) {
      throw ApiError.setBadRequest("존재하지 않는 즐겨찾기입니다.");
    }

    await restaurantModel.deleteLike(userId, title);
  },
};
