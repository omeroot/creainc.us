// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@creainc/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [
    sharedConfig,
    {
      plugins: [
        require("@tailwindcss/forms"),
      ],
    },
  ],
};

export default config;
