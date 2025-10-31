import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import axios from "axios";

export async function airqualityHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const lat = request.query.get("lat");
  const lon = request.query.get("lon");
  const past_days = request.query.get("past_days") || "5";
  const forecast_days = request.query.get("forecast_days") || "3";

  if (!lat || !lon) {
    return {
      status: 400,
      jsonBody: { error: "lat and lon required" }
    };
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

    return {
      status: 200,
      jsonBody: {
        location: { lat, lon },
        hourly: data.hourly
      }
    };
  } catch (err: any) {
    context.log(`Error: ${err.message}`);
    return {
      status: 500,
      jsonBody: { error: "Failed to fetch data" }
    };
  }
}

// ✅ Register function at startup (top-level call)
app.http("airquality", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: airqualityHandler
});
