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
import { useContext } from "react";
import { SceneContext } from "./scene-context";

export function useScene(): SceneContext;
export function useScene(ready: true): Extract<SceneContext, { isViewReady: true }>;

export function useScene(ready?: boolean) {
  const scene = useContext(SceneContext);
  if (!scene) {
    throw new Error("useScene must be used within an <Scene>");
  }
  if (ready && !scene.isViewReady) {
    throw new Error("useScene called expecting ready view, but view has not yet been initialized");
  }
  return scene;
}
