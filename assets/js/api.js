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

// NUEVA CLASE: Para manejar la geolocalización por IP
export class IPGeoAPI {
    constructor(apiKey) {
        // ATENCIÓN: Coloca aquí tu API Key de ipgeolocation.io
        this.apiKey = apiKey || "b1e35d4898b144a99864fc773757229e"; 
        this.baseURL = "https://api.ipgeolocation.io/v3/ipgeo";
    }

    async getIPLocation(ip = "") {
        // Si pasas una IP como parámetro, la busca; si lo dejas vacío, detecta la tuya automáticamente.
        const ipParam = ip ? `&ip=${ip}` : "";
        const url = `${this.baseURL}?apiKey=${this.apiKey}${ipParam}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP IPGeo: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Hubo un error al consultar la API de IP:", error);
            throw error;
        }
    }
}