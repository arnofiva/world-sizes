import Color from "@arcgis/core/Color";
import Accessor from "@arcgis/core/core/Accessor";
import { property } from "@arcgis/core/core/accessorSupport/decorators";

export type CountryColor = {
  main: Color;
  light: Color;
  dark: Color;
};

function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default class CountryPalette extends Accessor {
  @property()
  get selectionColor() {
    return this.colors.length ? this.colors[0] : undefined;
  }

  constructor(private colors: CountryColor[]) {
    super();
    shuffle(colors);
  }

  allocate() {
    this.colors.length && this.colors.shift();
  }

  reinstate(color: CountryColor) {
    this.colors.push(color);
  }
}
