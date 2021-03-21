export const sleep = (ms = 2000) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function getRandomColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let rgb = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
