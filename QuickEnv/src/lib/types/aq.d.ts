export type TAirQualityResponse = {
    location: {
        lat: number;
        lon: number;
    };
    hourly: {
        time: string[];
        european_aqi: number[];
        pm10: number[];
        pm2_5: number[];
        carbon_monoxide: number[];
        carbon_dioxide: number[];
        nitrogen_dioxide: number[];
        sulphur_dioxide: number[];
        ozone: number[];
        aerosol_optical_depth: number[];
        dust: number[];
        methane: number[];
        uv_index: number[];
    }
}
