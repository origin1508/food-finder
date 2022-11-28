import { Restaurant } from "../schema";

export default {
  async creatLike(userId, restaurantInfo) {
    const { title, address, roadAddress, mapX, mapY, link } = restaurantInfo;

    await Restaurant.create({
      user_id: userId,
      title: title,
      address: address,
      road_address: roadAddress,
      map_x: mapX,
      map_y: mapY,
      url: link,
    });
  },
};
