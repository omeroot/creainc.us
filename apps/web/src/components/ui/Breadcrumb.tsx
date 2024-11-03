import React from "react";
import { cn } from "src/utils/cn";

const BreadCrumb = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex items-center justify-start space-x-4 font-[sans-serif]",
      className
    )}
    {...props}
  />
));
BreadCrumb.displayName = "Card";

const BreadCrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex items-center text-sm lg:text-base text-black cursor-pointer",
      className
    )}
    {...props}
  />
));

const BreadCrumbSeperator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-base text-gray-500", className)}
    {...props}
  >
    /
  </span>
));

export { BreadCrumb, BreadCrumbItem, BreadCrumbSeperator };
