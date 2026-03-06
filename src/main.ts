import { whenOnce } from "@arcgis/core/core/reactiveUtils";
import "@esri/calcite-components/dist/components/calcite-loader";
import App from "./App";
import { view } from "./globals";

new App({
  container: "app",
});

whenOnce(() => !view.updating).then(() => {
  const loader = document.getElementById("loader");
  loader?.parentElement?.removeChild(loader);
});

(window as typeof window & { view: typeof view }).view = view;
