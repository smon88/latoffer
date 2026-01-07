function togglePopup(type) {
    const popup = document.getElementById('popup');
    const titleChoose = document.getElementById('popupTitle');
    const typeTxt = document.getElementById('typeChoose').textContent;
    const cabinaTxt = document.getElementById('cabinaChoose').textContent;
    const dateVueltaChoose = document.getElementById('dateVuelta');

    // Elementos que se muestran u ocultan
    const elements = {
        titleOD: document.getElementById('titleOD'),
        titleTC: document.getElementById('titleTC'),
        inputO: document.getElementById('inputOrigen'),
        inputD: document.getElementById('inputDestino'),
        listT: document.getElementById('listType'),
        listC: document.getElementById('listCabina'),
        listAirport: document.getElementById('airport-info'),
        date: document.getElementById('date'),
        calendar: document.getElementById('calendar'),
        passengers: document.getElementById('passengers')
    };

    // Función para ocultar todos los elementos
    function hideAll() {
        for (let key in elements) {
            elements[key].classList.add('hidde');
        }
        document.getElementById('confirmBtn').disabled = true;
    }

    hideAll();

    // Función para mostrar elementos específicos
    function showElements(showKeys) {
        showKeys.forEach(key => elements[key].classList.remove('hidde'));
    }

    popup.classList.toggle('hidde');
    titleChoose.innerHTML = type === 'viajas' ? "¿Cuando viajas?" : type;

    switch (type) {
        case 'Origen':
            showElements(['titleOD', 'inputO', 'listAirport']);
            break;
        case 'Destino':
            showElements(['titleOD', 'inputD', 'listAirport']);
            break;
        case 'Viaje':
            showElements(['titleTC', 'listT']);
            document.getElementById('confirmBtn').disabled = false;

            formatUl(document.getElementById('listType'), typeTxt);
            break;
        case 'Cabina':
            showElements(['titleTC', 'listC']);
            document.getElementById('confirmBtn').disabled = false;

            formatUl(document.getElementById('listCabina'), cabinaTxt);
            break;
        case 'viajas':
            showElements(['date', 'calendar']);
            document.getElementById('confirmBtn').disabled = true;

            dateVueltaChoose.textContent = typeTxt === "Solo ida" ? "Solo ida" : "Selecciona";
            break;
        case 'Agregar pasajeros':
            showElements(['passengers']);
            document.getElementById('confirmBtn').disabled = false;
            break;
        case close:
            popup.classList.remove('hidde');
            break;
    }
}

function formatUl(ul, typeTxt){
    const lis = ul.getElementsByClassName('popup__li');

    Array.from(lis).forEach(function(li) {
        li.querySelector('.popup__mark').classList.remove('active');

        if(li.textContent === typeTxt){
            li.querySelector('.popup__mark').classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre las opcines de los ULs
    const listCabina = document.getElementById('listCabina');
    const listType = document.getElementById('listType');

    // Función para manejar el clic en un ul específico
    function handleListClick(event) {
        let targetElement = event.target;

        // Verifica que el clic fue en un li o en un elemento dentro de un li
        if (targetElement.classList.contains('popup__li') || targetElement.closest('.popup__li')) {
            // Si clicamos en un elemento dentro del li, seleccionamos el li padre
            const li = targetElement.closest('.popup__li');
            const ul = li.parentElement;
            const lis = ul.getElementsByClassName('popup__li');

            Array.from(lis).forEach(function(li) {
                li.querySelector('.popup__mark').classList.remove('active');
            });

            li.querySelector('.popup__mark').classList.add('active');
        }
    }

    // Eventos de click en los ul
    listCabina.addEventListener('click', handleListClick);
    listType.addEventListener('click', handleListClick);

    // Función para manejar el clic en el botón "Continuar"
    confirmBtn.addEventListener('click', function() {
        const popup = document.getElementById('popup');

        const typeTxt = document.getElementById('typeChoose');
        const cabinaTxt = document.getElementById('cabinaChoose');
        // Busca el li que tiene la clase 'active' en ambos ul
        const activeCabina = listCabina.querySelector('.popup__li .active');
        const activeType = listType.querySelector('.popup__li .active');

        const titleChoose = document.getElementById('popupTitle').innerHTML;
        const origenChoose = document.getElementById('origenChoose');
        const destinoChoose = document.getElementById('destinoChoose');

        const inputAirportO = document.getElementById('inputAirportO');
        const inputAirportD = document.getElementById('inputAirportD');

        let selectedText = '';

        switch (titleChoose) {
            case 'Origen':
                const [cityCodeO, countryO] = inputAirportO.value.split(' - ');
                const [cityO, codeO] = cityCodeO.split(', ');

                origenChoose.innerHTML = `<b>${cityO}</b>, ${codeO} - ${countryO}`;
                origenChoose.classList.add('fly__input--txt');

                seeDate(origenChoose.innerHTML, destinoChoose.innerHTML);
                break;
            case 'Destino':
                const [cityCodeD, countryD] = inputAirportD.value.split(' - ');
                const [cityD, codeD] = cityCodeD.split(', '); 

                destinoChoose.innerHTML = `<b>${cityD}</b>, ${codeD} - ${countryD}`;
                destinoChoose.classList.add('fly__input--txt');

                seeDate(origenChoose.innerHTML, destinoChoose.innerHTML);
                break;
            case 'Viaje':
                if (activeType) {
                    selectedText += activeType.parentElement.textContent.trim();
                }

                console.log(selectedText)

                typeTxt.textContent = selectedText.trim();
                document.getElementById('typeTravel').value = selectedText.trim();
                break;
            case 'Cabina':
                if (activeCabina) {
                    selectedText += activeCabina.parentElement.textContent.trim() + ' ';
                }

                document.getElementById('typeCabina').value = selectedText.trim();
                cabinaTxt.textContent = selectedText.trim();
                break;
            case '¿Cuando viajas?':
                imprimirFechas();
                break;
            case 'Agregar pasajeros':
                updatePassengerSummary();
                break;
        }

        popup.classList.toggle('hidde');

        cleanElements();
    });

    function cleanElements(){
        document.getElementById('inputAirportO').value = "";
        document.getElementById('inputAirportD').value = "";

        clearSelection();
        document.getElementById('dateIda').textContent = "Selecciona";
        document.getElementById('dateVuelta').textContent = "Selecciona";
    }

    function seeDate(origen, destino){
        if(origen != "Origen" && destino != "Destino"){
            document.getElementById('moreInfo').classList.remove('hidde');
        }
    }
});

var amounthPassengers = 1;

function passengers(type, operation) {
    const amountElements = [
        document.getElementById('amountAdult'), 
        document.getElementById('amountChild'), 
        document.getElementById('amountBaby')
    ];

    const alertAdult = document.getElementById('alertAdult');
    const alertChild = document.getElementById('alertChild');
    const alertBaby = document.getElementById('alertBaby');
    const alertError = document.getElementById('alertError');

    // Validación: No pueden haber menos de 1 adulto
    if (parseInt(amountElements[0].textContent) == 1 && type == 1 && !operation) {
        alertAdult.classList.remove('hidde');

        setTimeout(() => {
            alertAdult.classList.add('hidde');
        }, 5000);

        return;
    }

    let amounthPassengers = 0;

    // Calcular el número total de pasajeros actuales
    amountElements.forEach(element => {
        amounthPassengers += parseInt(element.textContent);
    });

    // Verificar si se puede realizar la operación (nunca más de 9 pasajeros ni menos de 1 adulto)
    if ((amounthPassengers === 9 && operation) || 
        (type === 1 && !operation && parseInt(amountElements[0].textContent) === 1)) {
        return;
    }

    // Validación previa: Si se reduce el número de adultos, verificar que no haya más bebés que adultos
    if (type === 1 && !operation && parseInt(amountElements[2].textContent) >= parseInt(amountElements[0].textContent)) {
        alertError.classList.remove('hidde');

        setTimeout(() => {
            alertError.classList.add('hidde');
        }, 5000);
        return;
    }

    // Actualizar el conteo basado en el tipo y la operación
    let res = parseInt(amountElements[type - 1].textContent);

    if (operation) {
        amounthPassengers++;
        amountElements[type - 1].textContent = res + 1;
    } else if (res > 0) {
        amounthPassengers--;
        amountElements[type - 1].textContent = res - 1;
    }

    if (parseInt(amountElements[1].textContent) >= 1) {
        alertChild.classList.remove('hidde');
    } else {
        alertChild.classList.add('hidde');
    }

    if (parseInt(amountElements[2].textContent) >= 1) {
        alertBaby.classList.remove('hidde');
    } else {
        alertBaby.classList.add('hidde');
    }

    // Validación final: No puede haber más bebés que adultos después de la operación
    if (parseInt(amountElements[2].textContent) > parseInt(amountElements[0].textContent)) {
        alertError.classList.remove('hidde');

        setTimeout(() => {
            alertError.classList.add('hidde');
        }, 5000);

        // Revertir el cambio en la cantidad de bebés
        amountElements[2].textContent = operation ? res : res + 1;
        amounthPassengers--;
    }else{
        // Imprimimos en forma de array en input oculto para pasar la información
        document.getElementById('arrayPassengers').value = `[${amountElements[0].textContent}], [${amountElements[1].textContent}], [${amountElements[2].textContent}]`;
    }
}

function updatePassengerSummary() {
    const amountAdult = parseInt(document.getElementById('amountAdult').textContent);
    const amountChild = parseInt(document.getElementById('amountChild').textContent);
    const amountBaby = parseInt(document.getElementById('amountBaby').textContent);

    let summary = [];

    if (amountAdult > 0) {
        summary.push(`${amountAdult} Adult${amountAdult > 1 ? 'os' : 'o'}`);
    }

    if (amountChild > 0) {
        summary.push(`${amountChild} Niñ${amountChild > 1 ? 'os' : 'o'}`);
    }

    if (amountBaby > 0) {
        summary.push(`${amountBaby} Bebé${amountBaby > 1 ? 's' : ''}`);
    }

    document.getElementById('amountPersons').textContent = summary.join(', ');
    console.log(summary.join(', '));
}