export default function handler(req, res) {
  const now = new Date().toLocaleString("es-CO", { hour12: false });

  // Simular datos tipo onda
  const data = Array.from({ length: 40 }, (_, i) => Math.sin(i / 4) * 40 + 60);

  // Puntos suavizados
  const points = data.map((v, i) => `${40 + i * 15},${200 - v}`).join(" L ");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0d1117"/>
        <stop offset="100%" stop-color="#111"/>
      </linearGradient>
      <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4fc3f7"/>
        <stop offset="100%" stop-color="#2196f3"/>
      </linearGradient>
    </defs>

    <!-- Fondo -->
    <rect width="100%" height="100%" fill="url(#bg)"/>

    <!-- Cuadrícula -->
    <g stroke="#222" stroke-width="1">
      ${Array.from({ length: 10 }, (_, i) => `<line x1="40" y1="${60 + i * 30}" x2="760" y2="${60 + i * 30}"/>`).join("")}
      ${Array.from({ length: 20 }, (_, i) => `<line x1="${40 + i * 35}" y1="60" x2="${40 + i * 35}" y2="350"/>`).join("")}
    </g>

    <!-- Ejes -->
    <line x1="40" y1="60" x2="40" y2="350" stroke="#888" stroke-width="2"/>
    <line x1="40" y1="350" x2="760" y2="350" stroke="#888" stroke-width="2"/>

    <!-- Línea del gráfico -->
    <path d="M ${points}" fill="none" stroke="url(#line)" stroke-width="3" stroke-linecap="round"/>

    <!-- Texto -->
    <text x="50" y="40" fill="#4fc3f7" font-size="22" font-weight="bold">📊 Gráfico del Sensor (Simulado)</text>
    <text x="50" y="380" fill="#aaa" font-size="14">Actualizado: ${now}</text>
  </svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}

