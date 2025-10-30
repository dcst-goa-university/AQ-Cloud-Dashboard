export interface AirQualityResponse {
	location: {
		lat: number;
		lon: number;
	};
	hourly: Record<string, any>;
}

export const getAirQuality = async (
	lat: number,
	lon: number,
	options?: { past_days?: number; forecast_days?: number }
): Promise<AirQualityResponse> => {
	const params = new URLSearchParams({
		lat: lat.toString(),
		lon: lon.toString(),
		past_days: (options?.past_days ?? 5).toString(),
		forecast_days: (options?.forecast_days ?? 3).toString()
	});

	try {
		// In local and production this works because SWA routes /api/* correctly
		const res = await fetch(`/api/airquality?${params.toString()}`);

		if (!res.ok) {
			throw new Error(`API request failed with ${res.status}`);
		}

		const data = await res.json();
		return data as AirQualityResponse;
	} catch (err) {
		console.error("Failed to fetch air quality data:", err);
		throw err;
	}
};
