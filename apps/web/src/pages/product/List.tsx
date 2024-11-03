import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "src/common/request/api";
import { ProductCard } from "src/components/ui/custom/ProductCard";
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
    <div className="font-[sans-serif] pb-8 mx-auto lg:max-w-7xl sm:max-w-full px-6 py-8 lg:px-8">
      <h2 className="mb-12 text-4xl font-extrabold text-gray-800">
        Smart Watches
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: ProductType) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
