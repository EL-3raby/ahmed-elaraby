const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Exact dimensions: 1024 x 1440
const width = 1024;
const height = 1440;

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1440" width="1024" height="1440">
  <defs>
    <!-- Matte dark background gradient identical to original card -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141416" />
      <stop offset="50%" stop-color="#101012" />
      <stop offset="100%" stop-color="#0B0B0C" />
    </linearGradient>
  </defs>

  <!-- Clean dark card background -->
  <rect width="1024" height="1440" fill="url(#cardBg)" />

  <!-- Ahmed Elaraby -->
  <text x="512" y="635" text-anchor="middle" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="88" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
    Ahmed Elaraby
  </text>

  <!-- Phone Row: Phone Icon + 01050150780 -->
  <g transform="translate(512, 740)">
    <!-- Phone handset vector -->
    <g transform="translate(-250, -42) scale(1.8)">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
            fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Phone number text -->
    <text x="-185" y="0" text-anchor="start" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="600" fill="#FFFFFF" letter-spacing="1.5">
      01050150780
    </text>
  </g>

  <!-- 3 Bold & Extra Large Social Icons (GitHub, LinkedIn, Gmail) -->
  <!-- 1. GitHub Icon (Center: x = 320, y = 895, Size: ~108px) -->
  <g id="github-icon" transform="translate(320, 895)">
    <g transform="translate(-54, -54) scale(4.5)">
      <path fill="#FFFFFF" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </g>
  </g>

  <!-- 2. LinkedIn Icon (Center: x = 512, y = 895, Size: ~108px) -->
  <g id="linkedin-icon" transform="translate(512, 895)">
    <g transform="translate(-54, -54) scale(4.5)">
      <path fill="#FFFFFF" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
    </g>
  </g>

  <!-- 3. Gmail Icon (Center: x = 704, y = 895, Size: ~108px) -->
  <g id="gmail-icon" transform="translate(704, 895)">
    <g transform="translate(-54, -54) scale(4.5)">
      <path fill="#FFFFFF" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </g>
  </g>
</svg>
`;

async function main() {
  const svgBuffer = Buffer.from(svgContent);

  // Render to public/card-back.png
  await sharp(svgBuffer)
    .resize(width, height)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(__dirname, '../public/card-back.png'));

  // Also save the clean SVG
  fs.writeFileSync(path.join(__dirname, '../public/card-back.svg'), svgContent, 'utf8');

  console.log('Successfully generated card-back.png with extra large icons');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
