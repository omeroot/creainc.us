// ** Mock Adapter
import mock from "src/_fake-db/mock";
import { ProductType } from "src/types/product.types";

// ** Types

/**
 * Mock data
 * export type ProductType = {
  id: number;
  name: string;
  price: string;
  rating: number;
  currency: string;
  arrivalDate: string; iso date
  images: [
    {
      id: number;
      thumbUrl: string;
      largeUrl: string;
    },
  ];
  comments: [
    {
      id: number;
      name: string;
      comment: string;
      rating: number;
    },
  ];
};

  */
const data: { products: ProductType[] } = {
  products: [
    {
      id: 1,
      name: "Apple Watch Series 6",
      description: "The future of health is on your wrist.",
      arrivalDate: "2024-11-15T00:00:00.000Z",
      features: [
        "Blood Oxygen app",
        "ECG app",
        "High and low heart rate notifications",
        "Irregular heart rhythm notification",
        "Water resistant 50 meters",
        "Second-generation optical heart sensor",
        "International Emergency Calling",
        "Emergency SOS",
        "Accelerometer up to 32 g-forces with fall detection",
        "Gyroscope",
        "Ambient light sensor",
        "Speaker 50 percent louder",
        "Microphone (enables Noise app)",
        "Apple Pay",
        "GymKit",
        "Capacity 32GB",
        "Ceramic and sapphire crystal back",
      ],
      price: "399",
      rating: 4.5,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/FNVG3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1675957539935",
          largeUrl:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/FNVG3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1675957539935",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Apple Watch SE",
      description: "Heavy on features. Light on price.",
      arrivalDate: "2024-11-22T00:00:00.000Z",
      features: [
        "Large Retina OLED display",
        "Up to 2x faster processor than Series 3",
        "Swimproof design",
        "High and low heart rate notifications",
        "Irregular heart rhythm notification",
        "Built-in compass",
        "Altimeter",
        "Emergency SOS",
        "International emergency calling",
        "Fall detection",
        "S5 SiP with 64-bit dual-core processor",
        "watchOS 7 with sleep tracking, cycling directions, and new customizable watch faces",
        "100% recycled aluminum cases available in three finishes",
      ],
      price: "279",
      rating: 4.0,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYJ13ref_VW_34FR+watch-case-40-aluminum-silver-cell-se_VW_34FR+watch-face-40-aluminum-silver-se_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=eGl0bVpuNHpBMk1Ib3lOL2RNRmpTRStGZUJWLzNFUFVydllxZFp0d1M4Nm1sYnRuc1ZQRzh5aEVoS2ZQU0lHdVV0T01OakdybHBtTnFYazRzd1VWNlI4OFMza08xNVcyVm9vUnNISFZ1UEY4a0QxT3ZTNGFlaXlHVE9vYXh4cTMxRWcxcFNUbllKRGY4Szh6MTVJZ1N3RURuRVoxZjBkWlAvNkMrbU5jNUFLT0lodkdNeWd3SHAzZlUzNms5S2kxYTV3ZHB6VUg0cXhiSFFkSkkrM2ZpeDhQM1BuZGh2SS93aEpxS1Fja3hkQQ",
          largeUrl:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYJ13ref_VW_34FR+watch-case-40-aluminum-silver-cell-se_VW_34FR+watch-face-40-aluminum-silver-se_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=eGl0bVpuNHpBMk1Ib3lOL2RNRmpTRStGZUJWLzNFUFVydllxZFp0d1M4Nm1sYnRuc1ZQRzh5aEVoS2ZQU0lHdVV0T01OakdybHBtTnFYazRzd1VWNlI4OFMza08xNVcyVm9vUnNISFZ1UEY4a0QxT3ZTNGFlaXlHVE9vYXh4cTMxRWcxcFNUbllKRGY4Szh6MTVJZ1N3RURuRVoxZjBkWlAvNkMrbU5jNUFLT0lodkdNeWd3SHAzZlUzNms5S2kxYTV3ZHB6VUg0cXhiSFFkSkkrM2ZpeDhQM1BuZGh2SS93aEpxS1Fja3hkQQ",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 3,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 3,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 4,
        },
        {
          id: 4,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 5,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 4,
        },
        {
          id: 6,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
    {
      id: 3,
      name: "Apple Watch Series 3",
      description: "The ultimate device for a healthy life.",
      arrivalDate: "2024-12-01T00:00:00.000Z",
      features: [
        "Retina display",
        "Swimproof",
        "Optical heart sensor",
        "Stores music, podcasts, and audiobooks",
        "Elevation",
        "Emergency SOS",
        "S3 chip with dual-core processor",
        "watchOS with Activity trends, cycle tracking, hearing health innovations, and the App Store on your wrist",
      ],
      price: "199",
      rating: 5,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://www.apple.com/newsroom/images/product/watch/standard/watch_series_3_ceramic_newband_carousel.jpg.large.jpg",
          largeUrl:
            "https://www.apple.com/newsroom/images/product/watch/standard/watch_series_3_ceramic_newband_carousel.jpg.large.jpg",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
    {
      id: 4,
      name: "Apple Watch Nike",
      description: "Your perfect running partner.",
      arrivalDate: "2024-12-15T00:00:00.000Z",
      features: [
        "Nike Run Club app",
        "Nike Training Club app",
        "Exclusive Nike watch faces",
        "Aluminum case",
        "Ion-X glass",
        "Retina display with Force Touch",
        "Composite back",
        "Digital Crown",
        "Heart rate sensor, accelerometer, and gyroscope",
        "Ambient light sensor",
        "Speaker and microphone",
        "Wi-Fi (802.11b/g/n 2.4GHz)",
        "Bluetooth 4.0",
        "Up to 18 hours of battery life",
        "Water resistant 50 meters",
      ],
      price: "349",
      rating: 4.5,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MC1X4ref_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1724112857180",
          largeUrl:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MC1X4ref_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1724112857180",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
    {
      id: 5,
      name: "Apple Watch Hermes",
      description: "The freedom of cellular.",
      arrivalDate: "2024-12-25T00:00:00.000Z",
      features: [
        "Stainless steel case",
        "Sapphire crystal",
        "Ceramic back",
        "Digital Crown",
        "Heart rate sensor, accelerometer, and gyroscope",
        "Ambient light sensor",
        "Speaker and microphone",
        "Wi-Fi (802.11b/g/n 2.4GHz)",
        "Bluetooth 4.0",
        "Up to 18 hours of battery life",
        "Water resistant 50 meters",
      ],
      price: "1249",
      rating: 5.0,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MTJ03_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693087351673",
          largeUrl:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MTJ03_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693087351673",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
    {
      id: 6,
      name: "Apple Watch Edition",
      description: "The first watch that reads your heart rate.",
      arrivalDate: "2024-12-31T00:00:00.000Z",
      features: [
        "Ceramic case",
        "Sapphire crystal",
        "Digital Crown",
        "Heart rate sensor, accelerometer, and gyroscope",
        "Ambient light sensor",
        "Speaker and microphone",
        "Wi-Fi (802.11b/g/n 2.4GHz)",
        "Bluetooth 4.0",
        "Up to 18 hours of battery life",
        "Water resistant 50 meters",
      ],
      price: "799",
      rating: 4.5,
      currency: "$",
      images: [
        {
          id: 1,
          thumbUrl:
            "https://cdn.akakce.com/apple/apple-watch-edition-38-mm-z.jpg",
          largeUrl:
            "https://cdn.akakce.com/apple/apple-watch-edition-38-mm-z.jpg",
        },
      ],
      comments: [
        {
          id: 1,
          name: "John Doe",
          comment: "This is a great product.",
          rating: 5,
        },
        {
          id: 2,
          name: "Jane Doe",
          comment: "This is a great product.",
          rating: 5,
        },
      ],
    },
  ],
};

/**
 * Mock API call
 * GET /v1/products
 *
 * @param {string} q
 * @param {string} title
 * @returns {ProductType[]}
 *
 * @mock
 */
mock.onGet("/v1/products").reply(async () => {
  return [200, data.products];
});

/**
 * Mock API call
 * Add comment to product
 *
 * POST /v1/products/:id/comments
 *
 * @param {number} id
 */

mock.onPost("/v1/products/write-comment").reply((request) => {
  const { id, comment, rating } = JSON.parse(request.data);
  const product = data.products.find((p) => p.id === id);

  if (!product) return [400, { message: "Product not found" }];

  //TODO: Add user authentication and get user name from user
  product.comments.push({
    id: product.comments.length + 1,
    name: "John Doe",
    rating,
    comment,
  });

  product.rating = Math.round(
    product.comments.reduce((acc, c) => acc + c.rating, 0) /
      product.comments.length
  );

  return [200, product];
});

/**
 * Mock API call
 * Get product by id
 * GET /v1/products/:id
 * @param {number} id
 *
 * @returns {ProductType}
 */
mock.onGet(/\/v1\/products\/\d+/).reply((request) => {
  const id = Number(request.url?.split("/").pop());

  if (!id) return [400, { message: "Product ID not provided" }];

  const product = data.products.find((p) => p.id === id);

  if (!product) return [404, { message: "Product not found" }];

  return [200, product];
});
