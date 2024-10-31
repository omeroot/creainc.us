import { ReactNode } from "react";
import { useAuth } from "src/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  const auth = useAuth();

  return (
    <div id="default-layout" className="container pt-6 mx-auto lg:pt-10">
      <div className="flex flex-row items-center justify-end w-full p-4">
        <button
          onClick={() => auth.logout()}
          type="button"
          className="text-sm font-medium tracking-wider transition-all duration-300 outline-none cursor-pointer"
        >
          Log out
        </button>
      </div>
      {children}
    </div>
  );
}
