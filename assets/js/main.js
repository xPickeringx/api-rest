import { WeatherAPI, IPGeoAPI } from './api.js';
import { UI } from './ui.js';

// Inicializar Clases
const weatherAPI = new WeatherAPI("0866e90d8dmsh7cf0fede1dc8d1ep1dba6ejsn6844f5a51dc6");
const ipGeoAPI = new IPGeoAPI("b1e35d4898b144a99864fc773757229e"); 
const ui = new UI();

// Variables del DOM (Declaradas una sola vez)
const citySelect = document.getElementById('city-select');
const unitToggle = document.getElementById('unit-toggle');

// --- Cargar la IP al iniciar la aplicación ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtenemos la ubicación de la IP indicada
        const ipData = await ipGeoAPI.getIPLocation(""); 
        ui.showIPLocation(ipData);
    } catch (error) {
        ui.showIPLocation(null); 
    }
});

// --- Escuchar el evento 'change' del select de ciudades ---
citySelect.addEventListener('change', async (event) => {
    const selectedCity = event.target.value;
    
    if(selectedCity) {
        ui.showLoading();

        try {
            const weatherData = await weatherAPI.getWeatherData(selectedCity);
            ui.updateBackgroundAnimation(weatherData.weather[0].id);
            ui.showWeather(weatherData);
            
        } catch (error) {
            ui.showError("No se pudo obtener el clima. Verifica tu conexión o API Key.");
        }
    }
});

// --- Escuchar el evento del botón de grados ---
unitToggle.addEventListener('change', () => {
    ui.toggleUnit();
});