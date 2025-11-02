import { PUBLIC_VITE_API_BASE } from '$env/static/public';
import type { TAirQualityResponse } from '$lib/types/aq';


export const getAirQuality = async (
	lat: number,
	lon: number,
	options?: { past_days?: number; forecast_days?: number }
): Promise<TAirQualityResponse> => {
	const params = new URLSearchParams({
		lat: lat.toString(),
		lon: lon.toString(),
		past_days: (options?.past_days ?? 5).toString(),
		forecast_days: (options?.forecast_days ?? 3).toString()
	});

	try {
		const base = PUBLIC_VITE_API_BASE || ''; // If empty, will use relative path
		const url = `${base}/api/airquality?${params.toString()}`;
		console.log("Fetching air quality data from:", url);
		const res = await fetch(url);


		if (!res.ok) {
			throw new Error(`API request failed with ${res.status}`);
		}

		const data = await res.json();
		return data as TAirQualityResponse;
	} catch (err) {
		console.error("Failed to fetch air quality data:", err);
		throw err;
	}
};
