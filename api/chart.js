export default function handler(req, res) {
  const now = new Date().toLocaleString("es-CO", { hour12: false });

  // Datos simulados (para mostrar la forma del gráfico)
  const data = Array.from({ length: 20 }, (_, i) => Math.sin(i / 2) * 50 + 60);

  // Generar puntos en SVG
  const points = data
    .map((v, i) => `${50 + i * 30},${150 - v}`)
    .join(" ");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="300" style="background:#111;font-family:sans-serif">
      <rect width="100%" height="100%" fill="#111"/>
      <text x="30" y="40" fill="#4fc3f7" font-size="22">📊 Gráfico del Sensor (Simulado)</text>
      <polyline fill="none" stroke="#4fc3f7" stroke-width="3" points="${points}"/>
      <text x="30" y="280" fill="#aaa" font-size="14">Actualizado: ${now}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
