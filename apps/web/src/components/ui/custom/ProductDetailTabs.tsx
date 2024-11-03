import { ProductType } from "src/types/product.types";
import { twMerge } from "tailwind-merge";
import { StarGroup } from "../StarGroup";

const tabs = ["description", "reviews"] as const;

export type ProductDetailTabsProps = {
  product: ProductType;
  tab: (typeof tabs)[number];
  onTabChange: (tab: "description" | "reviews") => void;
};

export default function ProductDetailTabs({
  product,
  onTabChange,
  tab,
}: ProductDetailTabsProps) {
  return (
    <>
      <ul className="flex border-b">
        {tabs.map((t) => (
          <li
            key={t}
            onClick={() => onTabChange(t)}
            className={twMerge(
              "px-8 py-3 text-sm font-semibold",
              "text-gray-800 transition-all cursor-pointer",
              tab === t && "border-b-2 border-gray-800 bg-gray-100"
            )}
          >
            {t}
          </li>
        ))}
      </ul>

      {/* Tab description */}
      <div className={twMerge("hidden", tab === "description" && "block")}>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">
            Product Description
          </h3>
          <p className="mt-4 text-sm text-gray-500">{product.description}</p>
        </div>

        <ul className="pl-4 mt-6 space-y-3 text-sm text-gray-500 list-disc">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Tab Reviews */}
      <div className={twMerge("mt-8 hidden", tab === "reviews" && "block")}>
        <h3 className="text-xl font-bold text-gray-800">
          Reviews({product?.comments.length})
        </h3>

        {product?.comments.map((comment, index) => (
          <div key={comment.id} className="mt-4">
            <h4 className="text-sm font-bold">{comment.name}</h4>
            <div className="flex mt-1 space-x-1">
              <StarGroup star={comment.rating} />
              <p className="text-xs !ml-2 font-semibold">2 mins ago</p>
            </div>
            <p className="mt-4 text-xs">{comment.comment}</p>
            <hr
              className={twMerge(
                "my-4",
                index === product.comments.length - 1 && "hidden"
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}
