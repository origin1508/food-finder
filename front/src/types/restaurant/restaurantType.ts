export interface Restaurant {
  title: string;
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
    _id: string;
    title: string;
    address: string;
    road_address: string;
    map_x: number;
    map_y: number;
    url: string;
  }[];
}
