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
import { ReactNode, useEffect, useRef } from "react";
import { useScene } from "../Scene/useScene";
import CountrySelector from "../WorldSizes/CountrySelector";
import { AppContext } from "./app-context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const scene = useScene();

  const countrySelector = useRef<CountrySelector>(undefined);

  useEffect(() => {
    if (scene.isViewReady) {
      countrySelector.current ??= new CountrySelector(scene.view, scene.webScene);
    }
  }, [scene]);

  return <AppContext.Provider value={{ title: "World Sizes" }}>{children}</AppContext.Provider>;
};

export default AppProvider;
