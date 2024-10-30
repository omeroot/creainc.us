// ** Mock Adapter
import mock from "src/_fake-db/mock";
import { ProductType } from "src/types/product.types";

// ** Types

const data: { products: ProductType[] } = {
  products: [
    {
      id: 1,
      url: "maybelline",
      title: "maybelline",
      timestamp: "13.03.2023",
      products: [
        "maybelline new york lash sensational sky high cosmic black maskara",
      ],
    },
    {
      id: 2,
      url: "maybelline-newyork",
      products: ["newyork", "lipstick"],
      title: "maybelline newyork",
      timestamp: "14.03.2023",
    },
  ],
};

/**
 * Mock API call
 * GET /v1/analytics/products
 *
 * @param {string} q
 * @param {string} title
 * @returns {ProductType[]}
 *
 * @mock
 */
mock.onGet("/v1/products").reply((config) => {
  const { q = "", title = "" } = config.params ?? "";
  const filteredData = data.products.filter(
    (row) =>
      (q.length && row.title.toLowerCase().includes(q)) || row.url === title
  );

  if (title.length) {
    return [200, filteredData.shift()];
  } else if (q.length) {
    return [200, filteredData];
  } else {
    return [200, data.products];
  }
});
