import type {Color} from "~/models/Color";

export class Gene {
  id: string;
  name: string;
  description: string;
  dominantColor: Color | null;
  recessiveColor: Color | null;

  constructor(id: string, name: string, description: string, dominantColor: Color | null, recessiveColor: Color | null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dominantColor = dominantColor;
    this.recessiveColor = recessiveColor;
  }
}