export function generateRandomName(): string {
  const adjectives = ['Fluffy', 'Sparky', 'Mittens', 'Shadow', 'Coco'];
  const nouns = ['Whiskers', 'Paws', 'Tail', 'Ears', 'Fur'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
}