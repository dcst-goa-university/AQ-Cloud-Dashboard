<script lang="ts">
	import { onMount } from 'svelte';
	import { getAirQuality } from '$lib/api/metroapi';
	import type { TAirQualityResponse } from '$lib/types/aq';

	let airData: TAirQualityResponse | null = null;
	let error: string | null = null;
	let loading = true;
	let position: GeolocationPosition | null = null;

	onMount(() => {
		if (!navigator.geolocation) {
			error = 'Geolocation not supported';
			loading = false;
			return;
		}

		navigator.geolocation.getCurrentPosition(
			pos => {
				position = pos;
				(async () => {
					try {
						const { latitude: lat, longitude: lon } = pos.coords;
						const data = await getAirQuality(lat, lon);
						airData = data;
					} catch (err) {
						console.error('Error fetching air quality:', err);
						error = 'Unable to fetch air quality data';
					} finally {
						loading = false;
					}
				})();
			},
			err => {
				console.error('Error getting position:', err);
				error = 'Unable to get your location';
				loading = false;
			}
		);
	});
</script>

{#if loading}
	<p class="text-center text-gray-500">Fetching air quality data...</p>
{:else if error}
	<p class="text-red-500 text-center">{error}</p>
{:else}
	<section class="p-4">
		<h2 class="text-xl font-semibold mb-2">Air Quality</h2>
		<p>Latitude: {airData?.location.lat}, Longitude: {airData?.location.lon}</p>
		<p>European AQI: {airData?.hourly.european_aqi?.[0]}</p>
	</section>
{/if}
