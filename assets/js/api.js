export class WeatherAPI {
    constructor(apiKey) {
        this.apiKey = apiKey || "0866e90d8dmsh7cf0fede1dc8d1ep1dba6ejsn6844f5a51dc6"; 
        this.host = "open-weather13.p.rapidapi.com";
        this.baseURL = "https://open-weather13.p.rapidapi.com/city";
    }

    async getWeatherData(city) {
        const url = `${this.baseURL}?city=${encodeURIComponent(city)}&lang=ES`;
        
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-host': this.host,
                'x-rapidapi-key': this.apiKey
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Hubo un error al consultar la API:", error);
            throw error;
        }
    }
}