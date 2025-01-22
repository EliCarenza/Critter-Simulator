export function generateUniqueId(existingIds: Set<string>): string {
  let newId: string;
  do {
    newId = Math.random().toString(36).substr(2, 9); // Generates a random string of 9 characters
  } while (existingIds.has(newId));
  existingIds.add(newId);
  return newId;
}