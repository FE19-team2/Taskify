export function getDefaultProfileImage(name: string, size: number = 30): string {
  const displayText = name.slice(-2);

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- 배경 원 -->
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#4A90E2"/>
      
      <!-- 텍스트 -->
      <text
        x="${size / 2}"
        y="${size / 2}"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${size * 0.5}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${displayText}
      </text>
    </svg>
  `;

  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
