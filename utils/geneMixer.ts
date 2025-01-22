import { Pet } from '~/models/Pet';
import { generateRandomName } from './nameGenerator';
import { mixColors } from './colorMixer';

export function breedPets(parent1: Pet, parent2: Pet): Pet {
  const color = mixColors(parent1.color, parent2.color);
  const name = generateRandomName();
  const description = `Offspring of ${parent1.name} and ${parent2.name}`;

  return new Pet(color, name, description, color, parent1.id, parent2.id);
}