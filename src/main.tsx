/**
 * Copyright 2026 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import { AppProvider } from "./context/App/AppProvider";
import SceneProvider from "./context/Scene/SceneProvider";
import "./main.css";

const rootElement = document.createElement("div");

document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SceneProvider item="8e49a0c79bf543fd8fa52b4dd5c9a064">
      <AppProvider>
        <App />
      </AppProvider>
    </SceneProvider>
  </React.StrictMode>
);
