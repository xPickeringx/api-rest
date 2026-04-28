import { WeatherAPI } from './api.js';
import { UI } from './ui.js';

// Inicializar Clases (Ingresa tu API Key en los parámetros si no la pusiste directo en api.js)
const weatherAPI = new WeatherAPI("0866e90d8dmsh7cf0fede1dc8d1ep1dba6ejsn6844f5a51dc6");
const ui = new UI();

// Variables del DOM
const citySelect = document.getElementById('city-select');

// Escuchar el evento 'change' del select
citySelect.addEventListener('change', async (event) => {
    const selectedCity = event.target.value;
    
    if(selectedCity) {
        // 1. Mostrar estado de carga en la Interfaz
        ui.showLoading();

        try {
            // 2. Hacer la solicitud a la API
            const weatherData = await weatherAPI.getWeatherData(selectedCity);
            
            // 3. Imprimir el resultado en la Interfaz
            ui.showWeather(weatherData);
            
        } catch (error) {
            // 4. Manejar errores si falla la API
            ui.showError("No se pudo obtener el clima de esta ciudad. Verifica tu API Key o conexión.");
        }
    }
});