import { serve } from "bun";
import axios from "axios";

const port = 3000;

serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    console.log("Incoming request:", url.pathname); 
    if (url.pathname !== "/api/airquality") {
      return new Response("Not Found", { status: 404 });
      
    }

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    const past_days = url.searchParams.get("past_days") || "5";
    const forecast_days = url.searchParams.get("forecast_days") || "3";

    if (!lat || !lon) {
      return Response.json({ error: "lat and lon required" }, { status: 400 });
    }

    try {
      const { data } = await axios.get(
        "https://air-quality-api.open-meteo.com/v1/air-quality",
        {
          params: {
            latitude: lat,
            longitude: lon,
            hourly: [
              "european_aqi", "pm10", "pm2_5", "carbon_monoxide", "carbon_dioxide",
              "nitrogen_dioxide", "sulphur_dioxide", "ozone", "aerosol_optical_depth",
              "dust", "ammonia", "methane", "uv_index"
            ],
            past_days,
            forecast_days
          }
        }
      );

      return Response.json({
        location: { lat, lon },
        hourly: data.hourly
      });
    } catch (err: any) {
      console.error(err.message);
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }
  }
});

console.log(`🚀 Bun API running on http://localhost:${port}/api/airquality`);
