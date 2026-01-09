// Array para almacenar los datos de aeropuertos
let airportsData = [];

// Fetch para cargar el JSON de aeropuertos
fetch('/airports')
    .then(response => response.json())
    .then(data => {
        airportsData = data;
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Obtener los elementos del DOM
const inputAirportO = document.getElementById('inputAirportO');
const inputAirportD = document.getElementById('inputAirportD');
const airportInfoDiv = document.getElementById('airport-info');
const airportErrorA = document.getElementById('airportErrorAlert');

// Función para actualizar la lista de aeropuertos
function updateAirportList(input) {
    airportErrorA.style.display = "none";
    const query = input.value.toLowerCase();

    if (query.length < 2) {
        airportInfoDiv.classList.add('hidde');
        airportInfoDiv.innerHTML = '';
        airportErrorA.classList.add('hidde');
        return;
    }

    // Filtrar los aeropuertos según la consulta
    const filteredAirports = airportsData.filter(airport =>
        airport.city.toLowerCase().includes(query) ||
        airport.country.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query)
    );

    // Mostrar o esconder la lista dependiendo del resultado
    if (filteredAirports.length > 0) {
        let airportsHTML = '';

        filteredAirports.forEach(airport => {
            airportsHTML += `
                <div class="airport__element" onclick="selectAirport('${airport.code}', '${airport.city}, ${airport.code} - ${airport.country}');">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32">
                        <path d="M10.2341 16.2292C9.49892 16.417 8.90263 16.5069 8.45337 16.5069C6.84419 16.5069 5.55359 15.8371 4.57338 14.4893V14.4485L2.15552 10.5358C2.00032 10.2989 1.95946 10.0375 2.04115 9.74345C2.19635 9.44939 2.40874 9.26969 2.67013 9.18801L4.49167 8.55085C4.67954 8.46916 4.86742 8.45282 5.06346 8.49366C5.25951 8.5345 5.43923 8.61619 5.59443 8.74688L7.41597 10.013L8.83726 11.0422L12.7908 9.66179L7.68554 4.9159C7.44865 4.65451 7.36699 4.4013 7.44867 4.16442C7.50585 3.90303 7.67734 3.73149 7.96324 3.64981L8.00412 3.60898L10.618 2.93916C10.9937 2.83297 11.3205 2.85751 11.6064 3.02087L17.0628 5.91247C17.1935 5.99415 17.2916 6.10851 17.3406 6.27188C17.3978 6.42708 17.3814 6.59046 17.2998 6.74566C17.2181 6.87636 17.1037 6.96618 16.9403 7.02336C16.7851 7.08054 16.6218 7.06421 16.4666 6.98253L11.0509 4.13177H10.9774L9.15584 4.60555L14.3755 9.47388C14.5307 9.62908 14.5878 9.82516 14.5307 10.0702C14.4735 10.2826 14.3428 10.4296 14.1386 10.5031L8.95163 12.3246C8.71475 12.3818 8.52688 12.3492 8.39618 12.243L6.69714 11.0177L4.87561 9.75163C4.8511 9.75163 4.83478 9.7353 4.83478 9.7108L3.41348 10.2254L5.58625 13.7868C6.08453 14.473 6.689 14.9222 7.38331 15.1264C8.07763 15.3388 8.90265 15.3143 9.85018 15.0447L27.0937 9.07364C27.4612 8.94294 27.7879 8.77959 28.082 8.57538C28.3679 8.37933 28.5721 8.1588 28.6783 7.92191C28.7845 7.66053 28.7845 7.36646 28.6783 7.04789C28.6538 6.89269 28.5558 6.72115 28.3842 6.53328C28.2127 6.3454 27.9023 6.23919 27.4531 6.19834C27.0038 6.1575 26.334 6.28005 25.4355 6.57411L20.8448 8.15878C20.6896 8.20779 20.5262 8.19963 20.371 8.11795C20.2158 8.03626 20.1097 7.9219 20.0525 7.75854C19.9953 7.60334 20.0117 7.43996 20.0933 7.28476C20.175 7.12956 20.2894 7.02336 20.4528 6.96618L25.0434 5.3815C26.3095 4.95675 27.3469 4.8506 28.1474 5.06297C28.9479 5.27535 29.5115 5.78992 29.8301 6.60676C30.0669 7.2684 30.0588 7.8729 29.7892 8.42835C29.4216 9.19618 28.6538 9.80063 27.4939 10.2499L10.2504 16.221H10.2341V16.2292ZM18.2636 29.125H2.63747C2.45777 29.125 2.30257 29.0678 2.18005 28.9453C2.05752 28.8227 2.00031 28.692 2.00031 28.5287C2.00031 28.3408 2.06569 28.1938 2.18005 28.0712C2.30257 27.9569 2.4496 27.8916 2.63747 27.8916H18.2636C18.4433 27.8916 18.5985 27.9487 18.7129 28.0712C18.8354 28.1938 18.8926 28.3408 18.8926 28.5287C18.8926 28.6839 18.8354 28.8227 18.7129 28.9453C18.5985 29.0678 18.4515 29.125 18.2636 29.125Z" fill="currentColor"></path>
                    </svg>

                    <p class="airport__first">${airport.city}, ${airport.code} - ${airport.country}</p>
                    <p class="airport__last">${airport.name}</p>
                </div>
            `;
        });

        airportInfoDiv.innerHTML = airportsHTML;
        airportInfoDiv.classList.remove('hidde');   
        airportErrorA.classList.add('hidde');
    } else {
        airportErrorA.classList.remove('hidde');
        airportErrorA.style.removeProperty("display");
        airportInfoDiv.classList.add('hidde');
        airportInfoDiv.innerHTML = '';
    }
}

const titleChoose = document.getElementById('popupTitle');

// Función para seleccionar un aeropuerto
function selectAirport(code, airportText) {
    switch (titleChoose.innerHTML) {
        case 'Origen':
            inputAirportO.value = airportText;
            document.getElementById('originCode').value = code;
            break;
        case 'Destino':
            inputAirportD.value = airportText;
            document.getElementById('destinyCode').value = code;
            break;
    }

    // Ocultar la lista de aeropuertos
    airportInfoDiv.classList.add('hidde');
    airportInfoDiv.innerHTML = '';
    document.getElementById('confirmBtn').disabled = false;
}

// Escuchar el evento 'input' para actualizar la lista mientras el usuario escribe
inputAirportO.addEventListener('input', () => updateAirportList(inputAirportO, true));
inputAirportD.addEventListener('input', () => updateAirportList(inputAirportD, false));
