export class UI {
    constructor() {
        this.resultContainer = document.getElementById('weather-result');
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