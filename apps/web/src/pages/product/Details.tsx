import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import api from "src/common/request/api";
import { useForm } from "src/hooks/useForm";
import {
  CommentPostData,
  PostCommentSchema,
} from "src/schema/product/postComment";
import { Link, useParams } from "react-router-dom";
import { ProductType } from "src/types/product.types";
import { StarGroup } from "src/components/ui/StarGroup";
import { Svg } from "src/components/ui/Svg";

const tabs = ["description", "reviews"] as const;

const commentIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" > <path d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z" data-original="#000000" /> <path d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z" data-original="#000000" /> <path d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z" data-original="#000000" /> </svg>`;
const starIcon = `<svg className="w-3 mr-1" fill="currentColor" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg" > <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" /> </svg>`;
const backIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" ></path> </svg>`;

const fetchData = async (id: string) => {
  const response = await api.get(`/v1/products/${id}`);

  if (response.status !== 200) {
    throw new Error("Error fetching data");
  }

  return response.data;
};

export default function ProductDetails() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [vote, setVote] = useState(0);

  // ref
  const commentRef = useRef<HTMLTextAreaElement>(null);

  //TODO: move to hash router
  const [tab, setTab] = useState<"description" | "reviews">("description");
  const { handleSubmit, error } = useForm<CommentPostData>({
    schema: PostCommentSchema,
  });

  const { id } = useParams();

  useEffect(() => {
    fetchData(id!)
      .then((product) => setProduct(product))
      .catch((error) => setFetchError(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleTabChange = useCallback((tab: "description" | "reviews") => {
    setTab(tab);
  }, []);

  const onCommentSubmit = useCallback((data: CommentPostData) => {
    console.log("Comment submitted", data);
    api
      .post("/v1/products/write-comment", data)
      .then((response) => {
        if (response.status === 200) {
          setProduct((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              comments: response.data.comments,
              rating: response.data.rating,
            } as ProductType;
          });
        }

        setVote(0);
        commentRef.current!.value = "";
      })
      .catch((error) => {
        console.error("Error posting comment", error);
      })
      .finally(() => {
        // scroll to the bottom
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      });
  }, []);

  const onClickVote = (vote: number) => {
    setVote(vote);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="font-sans">
      <div className="max-w-2xl p-4 lg:max-w-6xl max-lg:mx-auto">
        {/* navigation */}
        <Link
          to="/products"
          className="mb-8 cursor-pointer inline-flex items-center border border-dark-300 px-3 py-1.5 rounded-md bg-white text-dark-500 hover:bg-gray-50"
        >
          <Svg className="w-6 h-6" svg={backIcon} />
          <span className="ml-1 font-semibold text-md">Products</span>
        </Link>

        {/* body */}
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2 max-lg:gap-16">
          <div className="top-0 w-full text-center lg:sticky">
            <div className="lg:max-h-[35rem]">
              <img
                src={product?.images[0]?.largeUrl}
                alt="Product"
                className="object-contain object-top w-full h-full rounded-md lg:w-11/12"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {product?.name}
                </h2>
              </div>
            </div>

            <hr className="my-8" />

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-gray-800">
                  {product?.currency}
                  {product?.price}
                </p>
                <p className="mt-2 text-sm text-gray-500"></p>
              </div>

              <div className="flex flex-wrap gap-4 ml-auto">
                <button
                  type="button"
                  className="px-2.5 py-1.5 bg-orange-100 text-xs text-orange-400 rounded-md flex items-center"
                >
                  <Svg className="w-3 h-auto mr-1" svg={starIcon} />
                  {product?.rating}
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                >
                  <Svg className="w-3 h-auto mr-1" svg={commentIcon} />
                  {product?.comments.length} Reviews
                </button>
              </div>
            </div>

            <hr className="my-8" />

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="w-full lg:w-auto min-w-[200px] px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md"
              >
                Buy now
              </button>
              <button
                type="button"
                className="w-full lg:w-auto min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md transition-all duration-300"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="max-w-4xl mt-20 min-h-[30rem]">
          <ul className="flex border-b">
            {tabs.map((t) => (
              <li
                key={t}
                onClick={() => handleTabChange(t)}
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
              <p className="mt-4 text-sm text-gray-500">
                {product?.description}
              </p>
            </div>

            <ul className="pl-4 mt-6 space-y-3 text-sm text-gray-500 list-disc">
              {product?.features.map((feature, index) => (
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

            <hr className="my-8" />

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Write a review
              </h3>

              <form onSubmit={handleSubmit(onCommentSubmit)}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <label className="sr-only">Your comment</label>
                    <textarea
                      id="comment"
                      ref={commentRef}
                      rows={4}
                      className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 "
                      placeholder="Write a comment..."
                      name="comment"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t ">
                    <div className="flex space-x-1 ps-0 rtl:space-x-reverse sm:ps-2">
                      <div className="flex justify-center space-x-2">
                        <StarGroup
                          extraOuterClassName="gap-3"
                          className="cursor-pointer h-9 w-9"
                          onClickStar={onClickVote}
                          star={vote}
                        />
                      </div>
                    </div>
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="rating" value={vote} />
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-600"
                    >
                      Post comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
