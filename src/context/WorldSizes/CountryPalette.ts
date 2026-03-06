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
import Color from "@arcgis/core/Color";

export type CountryColor = {
  main: Color;
  light: Color;
  dark: Color;
};

function shuffle(array: CountryColor[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export default class CountryPalette {
  get selectionColor() {
    return this.colors.length ? this.colors[0] : undefined;
  }

  constructor(private colors: CountryColor[]) {
    shuffle(colors);
  }

  allocate() {
    return this.colors.length && this.colors.shift();
  }

  reinstate(color: CountryColor) {
    this.colors.push(color);
  }
}
