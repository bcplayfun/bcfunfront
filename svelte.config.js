import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

import { fileURLToPath } from "url";
import { dirname } from "path";

const filePath = dirname(fileURLToPath(import.meta.url));
const stylesPath = `${filePath}/src/lib/styles/`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      prependData: `@use '${stylesPath}_media.scss';`,
    },
  }),
  kit: {
    adapter: adapter({ out: "build" }),
  },
  env: {
    dir: process.cwd(),
    publicPrefix: "BC_",
  },
};

export default config;
