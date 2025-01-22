import petSvgPath from '../assets/pet.svg';

export async function loadSvgContent(): Promise<string> {
  const response = await fetch(petSvgPath);
  return await response.text();
}