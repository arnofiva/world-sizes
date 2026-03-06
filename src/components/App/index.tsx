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
import "@esri/calcite-components/dist/components/calcite-shell";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-compass";
import "@arcgis/map-components/dist/components/arcgis-navigation-toggle";

import NavigationBar from "../NavigationBar";
import Scene from "../Scene";

const App = () => {
  return (
    <>
      <calcite-shell>
        <NavigationBar></NavigationBar>
        <Scene>
          <arcgis-zoom slot="top-left"></arcgis-zoom>
          <arcgis-navigation-toggle slot="top-left"></arcgis-navigation-toggle>
          <arcgis-compass slot="top-left"></arcgis-compass>
        </Scene>
      </calcite-shell>
    </>
  );
};

export default App;
