import { Restaurant } from "../schema";

export default {
  async creatLike(userId, restaurantInfo) {
    const { title, restaurantId, address, roadAddress, mapX, mapY, link } =
      restaurantInfo;

    await Restaurant.create({
      user_id: userId,
      restaurant_id: restaurantId,
      title: title,
      address: address,
      road_address: roadAddress,
      map_x: mapX,
      map_y: mapY,
      url: link,
    });
  },

  async deleteLike(userId, restaurantId) {
    await Restaurant.destroy({
      where: {
        user_id: userId,
        restaurant_id: restaurantId,
      },
    });
  },

  async findByRestaurantId(userId, restaurantId) {
    const restaurant = await Restaurant.findOne({
      where: {
        user_id: userId,
        restaurant_id: restaurantId,
      },
    });

    return restaurant;
  },

  async findAllByUserId(userId) {
    const restaurants = await Restaurant.findAll({
      where: {
        user_id: userId,
      },
    });

    return restaurants;
  },
};
