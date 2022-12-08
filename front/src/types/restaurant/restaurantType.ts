export interface Restaurant {
  title: string;
  restaurantId: number;
  address: string;
  roadAddress: string;
  mapX: number;
  mapY: number;
  link?: string;
}

export interface RestaurantInfoCardProps {
  title: string;
  address: string;
  road_address: string;
}

export interface LikedRestaurantQuery {
  success: boolean;
  message: string;
  result: {
    _id: number;
    restaurant_id: number;
    title: string;
    address: string;
    road_address: string;
    map_x: number;
    map_y: number;
    url: string;
  }[];
}
