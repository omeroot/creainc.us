import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div id="default-layout" className="container mx-auto pt-[4rem]">
      {children}
    </div>
  );
}
