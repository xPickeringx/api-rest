export class UI {
    constructor() {
        this.resultContainer = document.getElementById('weather-result');
        // NUEVO: Referencia al contenedor de animación de fondo
        this.backgroundContainer = document.getElementById('weather-background');
    }

    // Método para mapear el ID del clima a una clase CSS de animación
    updateBackgroundAnimation(weatherId) {
        // Mapeo basado en rangos de ID estándar de OpenWeatherMap
        let bgClass = 'modern-bg'; // Clase por defecto

        if (weatherId >= 200 && weatherId < 300) {
            bgClass = 'state-thunder'; // Tormenta
        } else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
            bgClass = 'state-rain'; // Llovizna o Lluvia
        } else if (weatherId >= 600 && weatherId < 700) {
            bgClass = 'state-snow'; // Nieve
        } else if (weatherId === 800) {
            bgClass = 'state-clear'; // Despejado/Soleado
        } else if (weatherId > 800 && weatherId < 900) {
            bgClass = 'state-clouds'; // Nublado
        }

        // Limpiar todas las clases existentes y aplicar la nueva suavemente
        this.backgroundContainer.className = ''; // Resetear
        this.backgroundContainer.classList.add(bgClass);
    }

    showLoading() {
        // Mantenemos la lógica existente, pero aseguramos resetear el fondo si hay error previo
        // this.backgroundContainer.className = ''; 
        this.resultContainer.innerHTML = `
            <div class="text-center fade-in-up py-4">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3 text-muted fw-medium">Consultando el cielo...</p>
            </div>
        `;
    }

    showError(message) {
        // Resetear animación de fondo en caso de error
        this.backgroundContainer.className = ''; 
        this.resultContainer.innerHTML = `
            <div class="alert alert-danger fade-in-up rounded-4 border-0 shadow-sm d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>${message}</div>
            </div>
        `;
    }

    showWeather(data) {
        const { name, main, weather, wind, visibility } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

        // Actualizar la estructura HTML inyectada (mantenemos la existente profesional)
        this.resultContainer.innerHTML = `
            <div class="text-center fade-in-up mt-2">
                <h2 class="fw-bold mb-0">${name}</h2>
                <p class="text-secondary text-capitalize fs-5 mb-0">${weather[0].description}</p>
                
                <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon mx-auto d-block">
                
                <div class="temp-main mb-4">${Math.round(main.temp)}°</div>
                
                <div class="row g-3 text-center mt-2">
                    <div class="col-6">
                        <div class="weather-detail-box shadow-sm">
                            <i class="bi bi-thermometer-half text-danger fs-4 mb-1 d-block"></i>
                            <span class="d-block text-muted small">Sensación</span>
                            <strong class="fs-5">${Math.round(main.feels_like)}°</strong>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="weather-detail-box shadow-sm">
                            <i class="bi bi-droplet-fill text-info fs-4 mb-1 d-block"></i>
                            <span class="d-block text-muted small">Humedad</span>
                            <strong class="fs-5">${main.humidity}%</strong>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="weather-detail-box shadow-sm">
                            <i class="bi bi-wind text-secondary fs-4 mb-1 d-block"></i>
                            <span class="d-block text-muted small">Viento</span>
                            <strong class="fs-5">${wind.speed} m/s</strong>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="weather-detail-box shadow-sm">
                            <i class="bi bi-eye-fill text-primary fs-4 mb-1 d-block"></i>
                            <span class="d-block text-muted small">Visibilidad</span>
                            <strong class="fs-5">${(visibility / 1000).toFixed(1)} km</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}