export class UI {
    constructor() {
        this.resultContainer = document.getElementById('weather-result');
        this.backgroundContainer = document.getElementById('weather-background');
        this.unitLabel = document.getElementById('unit-label');
        this.ipContainer = document.getElementById('ip-location-container');
        
        // NUEVO: Estado interno de la UI
        this.currentUnit = 'C'; // Empezamos en Celsius por defecto en Latam
        this.currentWeatherData = null; // Aquí guardaremos los datos de la API
    }

    // NUEVO: Método para mostrar los datos de la IP
    showIPLocation(data) {
        if (!data) {
            this.ipContainer.innerHTML = `<span class="text-danger small"><i class="bi bi-wifi-off"></i> Error al cargar IP</span>`;
            return;
        }

        const { ip, location } = data;
        
        this.ipContainer.innerHTML = `
            <div class="d-flex flex-column align-items-end lh-sm fade-in-up">
                <span class="fw-bold text-dark d-flex align-items-center fs-6">
                    <img src="${location.country_flag}" alt="${location.country_name}" width="20" class="me-2 border border-1 border-secondary rounded-1 shadow-sm"> 
                    ${location.city}, ${location.country_name} ${location.country_emoji}
                </span>
                <span style="font-size: 0.8rem;"><i class="bi bi-hdd-network text-primary"></i> IP: ${ip}</span>
            </div>
        `;
    }
    // NUEVO: Método para alternar las unidades y volver a renderizar
    toggleUnit() {
        if (this.currentUnit === 'C') {
            this.currentUnit = 'F';
            this.unitLabel.textContent = "Cambiar a °C";
        } else {
            this.currentUnit = 'C';
            this.unitLabel.textContent = "Cambiar a °F";
        }

        // Si ya hay datos en pantalla, los volvemos a pintar con la nueva unidad
        if (this.currentWeatherData) {
            this.showWeather(this.currentWeatherData);
        }
    }

    updateBackgroundAnimation(weatherId) {
        let bgClass = 'modern-bg';

        if (weatherId >= 200 && weatherId < 300) {
            bgClass = 'state-thunder';
        } else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
            bgClass = 'state-rain';
        } else if (weatherId >= 600 && weatherId < 700) {
            bgClass = 'state-snow';
        } else if (weatherId === 800) {
            bgClass = 'state-clear';
        } else if (weatherId > 800 && weatherId < 900) {
            bgClass = 'state-clouds';
        }

        this.backgroundContainer.className = ''; 
        this.backgroundContainer.classList.add(bgClass);
    }

    showLoading() {
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
        this.backgroundContainer.className = ''; 
        this.resultContainer.innerHTML = `
            <div class="alert alert-danger fade-in-up rounded-4 border-0 shadow-sm d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>${message}</div>
            </div>
        `;
    }

    showWeather(data) {
        // Guardamos los datos para usarlos si el usuario hace clic en el botón de cambiar unidad
        this.currentWeatherData = data; 

        const { name, main, weather, wind, visibility } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

        // LÓGICA DE CONVERSIÓN
        // La API que usas envía los datos en Fahrenheit por defecto
        let tempValue = main.temp;
        let feelsLikeValue = main.feels_like;

        if (this.currentUnit === 'C') {
            // Convertir Fahrenheit a Celsius: (F - 32) * 5/9
            tempValue = (tempValue - 32) * 5 / 9;
            feelsLikeValue = (feelsLikeValue - 32) * 5 / 9;
        }

        const symbol = this.currentUnit === 'C' ? '°C' : '°F';

        this.resultContainer.innerHTML = `
            <div class="text-center fade-in-up mt-2">
                <h2 class="fw-bold mb-0">${name}</h2>
                <p class="text-secondary text-capitalize fs-5 mb-0">${weather[0].description}</p>
                
                <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon mx-auto d-block">
                
                <div class="temp-main mb-4">${Math.round(tempValue)}${symbol}</div>
                
                <div class="row g-3 text-center mt-2">
                    <div class="col-6">
                        <div class="weather-detail-box shadow-sm">
                            <i class="bi bi-thermometer-half text-danger fs-4 mb-1 d-block"></i>
                            <span class="d-block text-muted small">Sensación</span>
                            <strong class="fs-5">${Math.round(feelsLikeValue)}${symbol}</strong>
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
                            <strong class="fs-5">${wind.speed} mph</strong>
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