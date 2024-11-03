export type ProductType = {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  rating: number;
  currency: string;
  arrivalDate: string;
  images: {
    id: number;
    thumbUrl: string;
    largeUrl: string;
  }[];
  comments: {
    id: number;
    name: string;
    comment: string;
    rating: number;
  }[];
};
