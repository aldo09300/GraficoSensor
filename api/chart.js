import { createCanvas } from "canvas";

export default async function handler(req, res) {
  try {
    // Crear un canvas de 800x400 píxeles
    const width = 800;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Fondo oscuro
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    // Título
    ctx.fillStyle = "#4fc3f7";
    ctx.font = "24px Sans-serif";
    ctx.fillText("📊 Gráfico del Sensor (Simulado)", 30, 40);

    // Ejes
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = 60 + i * 30;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(750, y);
      ctx.stroke();
    }

    // Datos simulados tipo onda
    ctx.strokeStyle = "#4fc3f7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < 700; x++) {
      const y = 200 + Math.sin(x / 40) * 100;
      ctx.lineTo(50 + x, y);
    }
    ctx.stroke();

    // Devolver como imagen PNG
    res.setHeader("Content-Type", "image/png");
    canvas.pngStream().pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error generando gráfico dinámico" });
  }
}
