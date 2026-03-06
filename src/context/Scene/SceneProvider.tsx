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
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { SceneContext, SceneReadyState, SceneState, WebSceneState } from "./scene-context";

declare global {
  interface Window {
    view?: SceneView;
  }
}

interface SceneProps {
  item: string;
}

type Action = { type: "WEB_SCENE_LOADED" } | { type: "SET_VIEW"; view: SceneView };

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case "WEB_SCENE_LOADED":
      return {
        ...state,
        loading: false,
      };
    case "SET_VIEW":
      return {
        ...state,
        isViewReady: true,
        view: action.view,
      };
  }
}

function InternalScene({ item, children }: PropsWithChildren<SceneProps>) {
  const webSceneReadyRef = useRef<Promise<WebSceneState>>(null);
  const resolveWebSceneReadyRef = useRef<(v: WebSceneState) => void>(null);

  const webScene = useMemo(() => {
    const webScene = new WebScene({
      portalItem: {
        id: item,
      },
    });

    webSceneReadyRef.current = new Promise<WebSceneState>(resolve => {
      resolveWebSceneReadyRef.current = resolve;
    });

    return webScene;
  }, [item]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const portalItem = webScene.portalItem;
        await Promise.all([webScene.loadAll(), portalItem?.load()]);
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (alive) {
          dispatch({ type: "WEB_SCENE_LOADED" });
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [webScene]);

  const viewReadyRef = useRef<Promise<SceneReadyState> | null>(null);
  const resolveViewReadyRef = useRef<((v: SceneReadyState) => void) | null>(null);

  // Create the promise exactly once per provider lifetime
  viewReadyRef.current ??= new Promise<SceneReadyState>(resolve => {
    resolveViewReadyRef.current = resolve;
  });

  if (!webSceneReadyRef.current) throw Error(/* Type guard */);

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    webScene,
    isViewReady: false,
  });

  useEffect(() => {
    if (!state.loading && resolveWebSceneReadyRef.current) {
      resolveWebSceneReadyRef.current(state);
    }
  }, [state]);

  const setView = useCallback(
    (view: SceneView) => {
      window.view = view;
      dispatch({ type: "SET_VIEW", view });
    },
    [dispatch]
  );

  useEffect(() => {
    if (state.isViewReady && resolveViewReadyRef.current) {
      resolveViewReadyRef.current(state);
      resolveViewReadyRef.current = null;
    }
  }, [state]);

  return (
    <SceneContext.Provider
      value={{
        ...state,
        waitForView: viewReadyRef.current,
        waitForWebScene: webSceneReadyRef.current,
        setView,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

const SceneProvider = memo(InternalScene);

export default SceneProvider;
