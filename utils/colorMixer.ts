function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 3) return q;
      if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function mixColors(color1: string, color2: string): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
  const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

  const randomFactor = () => (Math.random() - 0.5) * 0.1; // Random factor between -0.05 and 0.05

  const mixedHsl = {
    h: (hsl1.h + hsl2.h) / 2 + randomFactor(),
    s: (hsl1.s + hsl2.s) / 2 + randomFactor(),
    l: (hsl1.l + hsl2.l) / 2 + randomFactor()
  };

  // Ensure the values stay within valid ranges
  mixedHsl.h = Math.max(0, Math.min(1, mixedHsl.h));
  mixedHsl.s = Math.max(0, Math.min(1, mixedHsl.s));
  mixedHsl.l = Math.max(0, Math.min(1, mixedHsl.l));

  const mixedRgb = hslToRgb(mixedHsl.h, mixedHsl.s, mixedHsl.l);
  return rgbToHex(mixedRgb.r, mixedRgb.g, mixedRgb.b);
}