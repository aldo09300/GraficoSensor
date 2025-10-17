// /api/chart.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://hermes-api-jt8k.onrender.com/api/sensor/data/77c7cd49-b79f-4b62-90c2-9a3c2c2d6b94?limit=10"
    );
    const data = await response.json();

    let arr = [];
    if (Array.isArray(data)) arr = data;
    else if (Array.isArray(data.data)) arr = data.data;

    const points = arr.map((d) => d.value || d.valor || 0);
    const labels = arr.map((_, i) => i + 1);

    const chartConfig = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Fuerza (N)",
            data: points,
            borderColor: "rgb(79,195,247)",
            backgroundColor: "rgba(79,195,247,0.3)",
            fill: true,
            borderWidth: 3,
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { color: "white" } },
          title: {
            display: true,
            text: "📈 Dinamómetro Digital - Fuerza en tiempo real",
            color: "white",
          },
        },
        scales: {
          x: { ticks: { color: "white" }, title: { text: "Lecturas", display: true, color: "white" } },
          y: {
            ticks: { color: "white" },
            title: { text: "Fuerza (N)", display: true, color: "white" },
            min: 0,
            max: 200
          },
        },
        backgroundColor: "#111",
      },
    };

    const quickchartUrl =
      "https://quickchart.io/chart?width=1000&height=500&backgroundColor=transparent&c=" +
      encodeURIComponent(JSON.stringify(chartConfig));

    return res.redirect(quickchartUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando gráfico dinámico" });
  }
}
