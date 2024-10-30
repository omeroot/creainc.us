import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "src/common/request/api";
import { ProductType } from "src/types/product.types";

const fetchData = async () => {
  const response = await api.get("/v1/products");

  if (response.status !== 200) {
    throw new Error("Error fetching data");
  }

  return response.data;
};

export default function ProductList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // navigation
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then((products) => setProducts(products))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="font-[sans-serif] pb-8 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 className="mb-12 text-4xl font-extrabold text-gray-800">
        Smart Watches
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: ProductType) => (
          <div
            key={product.id}
            className="relative overflow-hidden transition-all rounded-lg shadow-md cursor-pointer bg-gray-50 hover:-translate-y-2"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
              <img
                src={product.images[0]?.thumbUrl}
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="p-6 bg-white">
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <h4 className="mt-2 text-lg font-bold text-gray-800">
                {product.currency}
                {product.price}
              </h4>

              <div className="flex mt-4 space-x-2">
                <svg
                  className="w-4 fill-orange-400"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-orange-400"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-orange-400"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
