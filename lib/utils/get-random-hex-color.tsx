export function getRandomHexColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const color = Math.abs(hash).toString(16).padStart(6, '0').slice(0, 6);
  return `#${color}`;
}
