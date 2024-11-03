import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import api from "src/common/request/api";
import { useForm } from "src/hooks/useForm";
import {
  CommentPostData,
  PostCommentSchema,
} from "src/schema/product/postComment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductType } from "src/types/product.types";
import { StarGroup } from "src/components/ui/StarGroup";
import { Svg } from "src/components/ui/Svg";
import type { AxiosError } from "axios";
import { showErrorToast } from "src/helper/toast";

const tabs = ["description", "reviews"] as const;

const commentIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" > <path d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z" data-original="#000000" /> <path d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z" data-original="#000000" /> <path d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z" data-original="#000000" /> </svg>`;
const starIcon = `<svg className="w-3 mr-1" fill="currentColor" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg" > <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" /> </svg>`;
const homeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511.999" > <path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0" data-original="#000000" /> </svg>`;
const truckSvg = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/> </svg> `;

const fetchData = async (id: string) => {
  try {
    const response = await api.get(`/v1/products/${id}`);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default function ProductDetails() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<AxiosError | null>(null);

  const [vote, setVote] = useState(0);

  // ref
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // navigation
  const navigate = useNavigate();

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

  useEffect(() => {
    if (error) {
      showErrorToast({
        message: error,
      });
    }
  }, [error]);

  const handleTabChange = useCallback((tab: "description" | "reviews") => {
    setTab(tab);
  }, []);

  const onCommentSubmit = useCallback((data: CommentPostData) => {
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
    if (fetchError.response?.status === 404) {
      navigate("/404");
      return null;
    }

    return <div>Unexpected Error.</div>;
  }

  return (
    <div className="font-sans">
      <div className="max-w-2xl px-6 py-8 lg:px-8 lg:max-w-6xl max-lg:mx-auto">
        {/* breadcrumb */}
        <ul className="flex items-center justify-start space-x-4 font-[sans-serif] mb-4 lg:mb-8">
          <Link
            to="/"
            className="flex items-center text-base text-gray-500 cursor-pointer"
          >
            <Svg className="w-4 fill-current" svg={homeSvg} />
          </Link>
          <li className="text-lg text-gray-500">/</li>
          <Link
            to={"/products"}
            className="flex items-center text-base text-gray-500 cursor-pointer"
          >
            Smart Watches
          </Link>
          <li className="text-lg text-gray-500">/</li>
          <li className="text-[#333] text-base font-bold flex items-center">
            {product?.name}
          </li>
        </ul>

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
            <div className="flex flex-col flex-wrap items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {product?.name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
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

            <hr className="my-6" />

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-gray-800">
                  {product?.currency}
                  {product?.price}
                </p>
                <p className="mt-2 text-xs text-gray-900">
                  Price when purchased online.
                </p>

                <div className="flex flex-row items-center gap-1 mt-2">
                  <Svg className="w-5 h-5" svg={truckSvg} />
                  <span className="text-sm italic text-gray-700">
                    Arrival at{" "}
                    {format(new Date(product!.arrivalDate), "MM.dd.yyy")}{" "}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-6" />

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
                          extraOuterClassName="gap-2"
                          className="w-6 h-6 cursor-pointer"
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
