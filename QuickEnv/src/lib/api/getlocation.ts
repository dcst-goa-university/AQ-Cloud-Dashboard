export const getLocation = async (): Promise<{ lat: number, long: number, name: string }> => {
	return new Promise<{ lat: number, long: number, name: string }>((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const lat = position.coords.latitude;
					const long = position.coords.longitude;

					fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${long}`)
						.then(response => response.json())
						.then(data => resolve({ lat, long, name: data.address.town }))
						.catch(error => reject(error));
				},
				error => reject(error)
			);
		} else {
			reject(new Error('Geolocation is not supported by your browser'));
		}
	});
};
