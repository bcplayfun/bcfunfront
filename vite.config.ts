import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";

export default (params: any) => {
  process.env = {
    ...process.env,
    ...loadEnv(params.mode, process.cwd(), "BC_"),
  };

  return defineConfig({
    plugins: [sveltekit()],
    envPrefix: "BC_",
    resolve: {
      alias: {
        $: "/src", // Adjust this to your project structure
      },
    },
  });
};
