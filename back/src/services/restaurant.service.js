import axios from "axios";
import dotenv from "dotenv";
import restaurantModel from "../db/model/restaurant.model";

dotenv.config();

// 맛집 즐겨찾기 추가?

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
    // console.log("response ====>", restaurant);

    return restaurant;
  },

  async restaurantLike(userId, restaurantInfo) {
    await restaurantModel.creatLike(userId, restaurantInfo);
  },
};
