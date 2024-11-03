import { MouseEventHandler } from "react";
import { ProductType } from "src/types/product.types";
import { Card, CardContent, CardDescription, CardHeader } from "../Card";

export const ProductCard = ({
  product,
  onClick,
}: {
  product: ProductType;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Card
      onClick={onClick}
      className="relative overflow-hidden transition-all rounded-lg shadow-md cursor-pointer bg-gray-50 hover:-translate-y-2"
    >
      <CardHeader>
        <div className="w-5/6 h-[260px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
          <img
            src={product.images[0]?.thumbUrl}
            alt="Product 1"
            className="object-contain w-full h-full"
          />
        </div>
        <CardDescription>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="text-lg font-bold text-gray-800">
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
      </CardContent>
    </Card>
  );
};
