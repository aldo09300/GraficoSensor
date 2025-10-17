export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://hermes-api-jt8k.onrender.com/api/sensor/data/77c7cd49-b79f-4b62-90c2-9a3c2c2d6b94?limit=20"
    );
    const data = await response.json();

    // Extraer valores numéricos
    const values = (Array.isArray(data.data) ? data.data : data)
      .map(d => Number(d.value || d.valor || 0))
      .filter(v => !isNaN(v));

    if (values.length === 0) throw new Error("Sin datos válidos");

    // Escalar valores a altura de gráfica
    const max = Math.max(...values);
    const min = Math.min(...values);
    const scale = v => 250 - ((v - min) / (max - min)) * 200;

    const points = values.map((v, i) => `${50 + i * 30},${scale(v)}`).join(" L ");
    const now = new Date().toLocaleString("es-CO", { hour12: false });

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

        <rect width="100%" height="100%" fill="url(#bg)"/>
        <text x="50" y="40" fill="#4fc3f7" font-size="22" font-weight="bold">📡 Datos del Sensor en Tiempo Real</text>
        <path d="M ${points}" fill="none" stroke="url(#line)" stroke-width="3" stroke-linecap="round"/>
        <text x="50" y="380" fill="#aaa" font-size="14">Última actualización: ${now}</text>
      </svg>`;

    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
  } catch (err) {
    console.error("❌ Error al generar gráfico:", err);
    res.status(500).json({ error: "No se pudo generar el gráfico dinámico" });
  }
}

