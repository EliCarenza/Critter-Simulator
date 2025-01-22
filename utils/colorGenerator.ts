export function generateRandomColor(): string {
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#00FFFF', // Cyan
    '#FF00FF', // Magenta
    '#000000', // Black
    '#FFFFFF', // White
    '#808080', // Gray
    '#FFA500', // Orange
    // Add more colors as needed
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}