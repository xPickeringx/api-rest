import { WeatherAPI } from './api.js';
import { UI } from './ui.js';

// Inicializar Clases (Ingresa tu API Key real)
const weatherAPI = new WeatherAPI("0866e90d8dmsh7cf0fede1dc8d1ep1dba6ejsn6844f5a51dc6");
const ui = new UI();

// Variables del DOM
const citySelect = document.getElementById('city-select');

// Escuchar el evento 'change' del select
citySelect.addEventListener('change', async (event) => {
    const selectedCity = event.target.value;
    
    if(selectedCity) {
        // 1. Mostrar estado de carga en la Interfaz (tarjeta)
        ui.showLoading();

        try {
            // 2. Hacer la solicitud a la API
            const weatherData = await weatherAPI.getWeatherData(selectedCity);
            
            // --- NUEVO FLUJO INTEGRADO ---
            // 3. Actualizar la animación de fondo basándose en el ID del clima (weather[0].id)
            ui.updateBackgroundAnimation(weatherData.weather[0].id);

            // 4. Imprimir el resultado detallado en la Interfaz (tarjeta)
            ui.showWeather(weatherData);
            
        } catch (error) {
            // 5. Manejar errores si falla la API
            ui.showError("No se pudo obtener el clima. Verifica tu conexión o API Key.");
        }
    }
});