import { twMerge } from "tailwind-merge";
import { Svg } from "./Svg";

const emptyStar = `<svg viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"> <path d="M10.4618 0.491211L13.7042 6.01946L20.0007 7.37346L15.7082 12.1441L16.3572 18.5092L10.4618 15.9293L4.5664 18.5092L5.21537 12.1441L0.922852 7.37346L7.21932 6.01946L10.4618 0.491211Z"/> </svg> `;
export const StarGroup = ({
  star = 0,
  className,
  extraOuterClassName,
  onClickStar = () => {},
}: {
  star?: number;
  className?: string;
  extraOuterClassName?: string;
  onClickStar?: (star: number) => void;
}) => {
  const stars = [];

  for (let i = 0; i < star; i++) {
    stars.push(
      <Svg
        onClick={() => onClickStar(i + 1)}
        key={i}
        className={twMerge("h-4 w-4 fill-orange-400", className)}
        svg={emptyStar}
      />
    );
  }

  for (let j = star; j < 5; j++) {
    stars.push(
      <Svg
        onClick={() => onClickStar(j + 1)}
        key={j}
        className={twMerge("h-4 w-4 fill-[#E2E4E3]", className)}
        svg={emptyStar}
      />
    );
  }

  return (
    <div
      className={twMerge(
        "flex max-w-fit flex-row items-center gap-1",
        extraOuterClassName
      )}
    >
      {stars}
    </div>
  );
};
