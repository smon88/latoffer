// =======================
// PASAJEROS
// =======================
const passengersTxt = document.getElementById('arrayPassengers').value;

const passengersArray = passengersTxt
  .replace(/[\[\]\s]/g, '')
  .split(',')
  .filter(Boolean)
  .map(Number);

const amountPassengers = passengersArray.reduce((acc, n) => acc + n, 0);
document.getElementById('amountPeople').textContent = amountPassengers;


// =======================
// CIUDADES (usa cityOrigin / cityDestiny de tu HTML)
// =======================
let airportsCache = null;

async function getAirports() {
  if (airportsCache) return airportsCache;
  const response = await fetch('/airports');
  airportsCache = await response.json();
  return airportsCache;
}

async function searchCity(code) {
  const data = await getAirports();
  return data.find(item => item.code === code);
}

async function loadCities() {
  try {
    const originCode = document.getElementById('originCode').value;
    const destinyCode = document.getElementById('destinyCode').value;

    const origin = await searchCity(originCode);
    const destiny = await searchCity(destinyCode);

    const cityOriginInput = document.getElementById('cityOrigin');
    const cityDestinyInput = document.getElementById('cityDestiny');

    if (origin) cityOriginInput.value = origin.city;
    if (destiny) cityDestinyInput.value = destiny.city;

    const flyEl = document.querySelector('.header__data-l .header__fly');
    if (flyEl) flyEl.textContent = `${cityOriginInput.value} > ${cityDestinyInput.value}`;

  } catch (error) {
    console.error('Error loading cities:', error);
  }
}

loadCities();


// =======================
// VUELOS
// =======================
let selectedFlightIda = null;
let selectedFlightVuelta = null;

const origin = document.getElementById('originCode').value;
const destiny = document.getElementById('destinyCode').value;

function formatTime(hour, minutes) {
  const period = hour >= 12 ? 'p. m.' : 'a. m.';
  hour = hour % 12 || 12;
  return `${hour}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

function generateFlightOptions() {
  const flights = [];
  const minPrice = 49999;
  const maxPrice = 49999;
  const baseDuration = 77;
  const numFlights = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
  const startHour = 14;
  const endHour = 20;

  let basePrice;

  for (let i = 0; i < numFlights; i++) {
    let duration = baseDuration;
    let type = "Directo";

    if (Math.random() > 0.5) {
      duration += Math.floor(Math.random() * 30) + baseDuration;
      type = "1 parada";
      if (i === 1) type = "Directo";
    }

    const departureHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    const departureMinutes = Math.floor(Math.random() * 60);

    const arrivalHour = departureHour + Math.floor(duration / 60);
    const arrivalMinutes = (departureMinutes + (duration % 60)) % 60;

    const departureTime = formatTime(departureHour, departureMinutes);
    const arrivalTime = formatTime(arrivalHour, arrivalMinutes);

    let price;
    if (i === 0) {
      basePrice = minPrice + Math.floor(Math.random() * (maxPrice - minPrice));
      price = basePrice;
    } else {
      price = basePrice + Math.floor(Math.random() * (maxPrice - basePrice));
    }

    if (i === 1) duration = baseDuration - Math.floor(Math.random() * 10);

    price = Math.min(price, maxPrice);

    flights.push({
      departureTime,
      arrivalTime,
      type,
      duration,
      price,
      operator: "LATAM Airlines Colombia"
    });
  }

  return flights;
}

function renderFlights(flights, originCode, destinyCode) {
  const flightsContainer = document.querySelector('#flights');
  flightsContainer.innerHTML = '';

  flights.forEach((flight) => {
    const flightElement = document.createElement('div');
    flightElement.classList.add('flights__element');

    flightElement.innerHTML = `
      <div class="flights__top">
        <div class="flights__mark">
          <span class="flights__advise"></span>
          <span class="flights__advise"></span>
        </div>
        <div class="flights__times">
          <div class="flights__times-txt">
            <p>${flight.departureTime}</p>
            <p>${originCode}</p>
          </div>
          <div class="flights__times-duration">
            <p>Duración</p>
            <p>${Math.floor(flight.duration / 60)} h ${flight.duration % 60} min</p>
          </div>
          <div class="flights__times-txt">
            <p>${flight.arrivalTime}</p>
            <p>${destinyCode}</p>
          </div>
        </div>
      </div>

      <div class="flights__bot">
        <div class="flights__type">
          <div class="flights__left">${flight.type}</div>
          <div class="flights__right">
            <p>Tarifa desde</p>
            <p>COP ${flight.price.toLocaleString('es-CO')}</p>
          </div>
        </div>

        <div class="flights__footer">
          <span>Operado por</span>
          <div>
            <img height="16" src="../assets/img/icons/SymbolPositive.svg" alt="LATAM Airlines Colombia">
            LATAM Airlines Colombia
          </div>
        </div>
      </div>
    `;

    flightElement.addEventListener('click', () => chooseFlight(flight));
    flightsContainer.appendChild(flightElement);
  });
}

function updateFlightInfo(element, flight, originCode, destinyCode) {
  const flightBox = element.querySelector('.flights__element');
  if (!flightBox) return;

  flightBox.innerHTML = `
    <div class="flights__top">
      <div class="flights__times">
        <div class="flights__times-txt">
          <p>${flight.departureTime}</p>
          <p>${originCode}</p>
        </div>

        <div class="flights__times-duration">
          <p><strong class="flights__type--txt">${flight.type}</strong></p>
          <p>${Math.floor(flight.duration / 60)} h ${flight.duration % 60} min</p>
        </div>

        <div class="flights__times-txt">
          <p>${flight.arrivalTime}</p>
          <p>${destinyCode}</p>
        </div>
      </div>
    </div>

    <div class="flights__bot flights__bot--border">
      <div class="flights__footer">
        <span>Operado por</span>
        <div>
          <img height="16" src="../assets/img/icons/SymbolPositive.svg" alt="LATAM Airlines Colombia">
          LATAM Airlines Colombia
        </div>
      </div>
    </div>

    <div class="flights__change">
      <span class="changeFlightBtn">Cambiar tu vuelo</span>
      <div class="flights__info">
        <p>Precio por pasajero</p>
        <p>COP ${flight.price.toLocaleString('es-CO')}</p>
      </div>
    </div>
  `;

  // ✅ Asignar el handler correcto al botón "Cambiar tu vuelo"
  const btn = flightBox.querySelector('.changeFlightBtn');
  if (!btn) return;

  if (element.id === 'resumeIda') {
    btn.addEventListener('click', clearSelections);
  } else {
    btn.addEventListener('click', changeVueltaForm);
  }
}

function generateAndRenderReturnFlights() {
  const returnFlights = generateFlightOptions();
  renderFlights(returnFlights, destiny, origin);
}


// =======================
// FLUJO SELECCIÓN
// =======================
function chooseFlight(flight) {
  const titleFlight = document.getElementById('titleFlight');
  const typeTravel = document.getElementById('typeTravel').value;

  const resume = document.getElementById('resume');
  const resumeIda = document.getElementById('resumeIda');
  const resumeVuelta = document.getElementById('resumeVuelta');

  const flightWrap = document.getElementById('flights-wrapper');
  const option = document.getElementById('option');
  const btnContinue = document.getElementById('btnContinue');

  const pricesArray = document.getElementById('arrayPriceTxt');
  const pricesFormat = pricesArray.value.split(',');

  if (typeTravel === "Ida y vuelta") {
    if (!selectedFlightIda) {
      selectedFlightIda = flight;

      resume.classList.remove('hidde');
      resumeIda.classList.remove('hidde');

      updateFlightInfo(resumeIda, selectedFlightIda, origin, destiny);

      titleFlight.textContent = "vuelo de vuelta";

      loaderPage();
      generateAndRenderReturnFlights();
      return;
    }

    selectedFlightVuelta = flight;

    resume.classList.remove('hidde');
    resumeVuelta.classList.remove('hidde');

    updateFlightInfo(resumeVuelta, selectedFlightVuelta, destiny, origin);

    flightWrap.classList.add('hidde');
    option.classList.remove('hidde');
    btnContinue.classList.remove('hidde');

    // Guardar precios
    pricesFormat[0] = `[${selectedFlightIda.price}]`;
    pricesFormat[1] = `[${selectedFlightVuelta.price}]`;

    // Guardar tipos/horarios
    document.getElementById('originType').value = selectedFlightIda.type;
    document.getElementById('destinyType').value = selectedFlightVuelta.type;

    document.getElementById('originDepartureTime').value = selectedFlightIda.departureTime;
    document.getElementById('originArrivalTime').value = selectedFlightIda.arrivalTime;

    document.getElementById('destinyDepartureTime').value = selectedFlightVuelta.departureTime;
    document.getElementById('destinyArrivalTime').value = selectedFlightVuelta.arrivalTime;

    pricesArray.value = pricesFormat.join(',');
    return;
  }

  // Solo ida
  resume.classList.remove('hidde');
  resumeIda.classList.remove('hidde');

  updateFlightInfo(resumeIda, flight, origin, destiny);

  flightWrap.classList.add('hidde');
  option.classList.remove('hidde');
  btnContinue.classList.remove('hidde');

  pricesFormat[0] = `[${flight.price}]`;
  pricesFormat[1] = `[0]`;

  document.getElementById('originType').value = flight.type;

  pricesArray.value = pricesFormat.join(',');
}


// =======================
// CAMBIAR / RESET
// =======================
function changeVueltaForm() {
  document.getElementById('resumeVuelta').classList.add('hidde');
  document.getElementById('option').classList.add('hidde');
  document.getElementById('btnContinue').classList.add('hidde');

  loaderPage();
  document.getElementById('flights-wrapper').classList.remove('hidde');
}

function clearSelections() {
  selectedFlightIda = null;
  selectedFlightVuelta = null;

  document.getElementById('titleFlight').textContent = "vuelo de ida";

  loaderPage();

  document.getElementById('resume').classList.add('hidde');
  document.getElementById('resumeIda').classList.add('hidde');
  document.getElementById('resumeVuelta').classList.add('hidde');

  document.getElementById('flights-wrapper').classList.remove('hidde');
  document.getElementById('option').classList.add('hidde');
  document.getElementById('btnContinue').classList.add('hidde');

  const newFlights = generateFlightOptions();
  renderFlights(newFlights, origin, destiny);
}


// =======================
// LOADER
// =======================
function loaderPage() {
  document.getElementById('loader').classList.remove('hidde');
  document.getElementById('flights').classList.add('hidde');

  setTimeout(() => {
    document.getElementById('loader').classList.add('hidde');
    document.getElementById('flights').classList.remove('hidde');
  }, 900);
}


// =======================
// FLEX (evita submit)
// =======================
function chooseOption(op) {
  const prices = document.getElementById('arrayPriceTxt');
  const pricesFormat = prices.value.split(',');

  if (op === 0) {
    document.getElementById('option').classList.add('active');
    pricesFormat[2] = '[34520]';
  } else {
    document.getElementById('option').classList.remove('active');
    pricesFormat[2] = '[0]';
  }

  prices.value = pricesFormat.join(',');
}


// =======================
// INIT
// =======================
const flights = generateFlightOptions();
renderFlights(flights, origin, destiny);
loaderPage();
