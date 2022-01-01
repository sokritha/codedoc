import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const bundle = async (rawCode: string) => {
  try {
    const result = await build(rawCode);
    return result;
  } catch (error) {
    if ((error as Error).message.match(/\binitialize\b/)) {
      await esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.13.7/esbuild.wasm",
      });
      return {
        code: "",
        err: "",
      };
    } else {
      return {
        code: "",
        err: (error as Error).message,
      };
    }
  }
};

async function build(rawCode: string) {
  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
    jsxFactory: "_React.createElement",
    jsxFragment: "_React.Fragment",
  });
  return {
    code: result.outputFiles[0].text,
    err: "",
  };
}

export default bundle;
