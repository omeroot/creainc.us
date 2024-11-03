import { useCallback, useEffect, useRef, useState } from "react";
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
import { ProductInfo } from "src/components/ui/custom/ProductInfo";
import {
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbSeperator,
} from "src/components/ui/Breadcrumb";
import ProductDetailTabs from "src/components/ui/custom/ProductDetailTabs";

const homeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511.999" > <path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0" data-original="#000000" /> </svg>`;

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

  const [vote, setVote] = useState<number>(0);

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

  const onNavigateToReview = useCallback(() => {
    setTab("reviews");
    // scroll to the tab content
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
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
        <BreadCrumb className="mb-8">
          <BreadCrumbItem>
            <Link to="/" className="flex items-center">
              <Svg className="w-4 fill-current" svg={homeSvg} />
            </Link>
          </BreadCrumbItem>
          <BreadCrumbSeperator />
          <BreadCrumbItem>
            <Link to={"/products"}>Smart Watches</Link>
          </BreadCrumbItem>
          <BreadCrumbSeperator />
          <BreadCrumbItem className="font-semibold">
            {product?.name}
          </BreadCrumbItem>
        </BreadCrumb>

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
            <ProductInfo
              onClickRating={onNavigateToReview}
              onClickReview={onNavigateToReview}
              product={product!}
            />

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
          <ProductDetailTabs
            product={product!}
            tab={tab}
            onTabChange={handleTabChange}
          />

          {tab === "reviews" && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
