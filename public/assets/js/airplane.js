const passengersTxt = document.getElementById('passengersTxt').value;
const passengersArray = passengersTxt
    .replace(/\[|\]|/g, '')
    .split(',')
    .map(Number);
let amountPassengersWOB = 0;

// Calculamos la cantidad de pasajeros
for (var i=0; i<passengersArray.length; i++){
    for (var o=0; o<passengersArray[i]; o++){
        if(i == 0){
            amountPassengersWOB++;
        }else if(i == 1){
            amountPassengersWOB++;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const typeGoingTxt = document.getElementById('typeGoingTxt').value;
    const typeLapTxt = document.getElementById('typeLapTxt').value;
    const originTxt = document.getElementById('originTxt').value;
    const destinyTxt = document.getElementById('destinyTxt').value;

    const carouselContent = document.querySelector('.sub-header__content');
    const prevArrow = document.querySelector('.sub-header__arrow--prev');
    const nextArrow = document.querySelector('.sub-header__arrow--next');
    const nextBtn = document.getElementById('btnContinueC');

    let currentIndex = 0;
    const elements = [];

    // Funcion para la generación de elementos de ida y vuelta
    function travelsChoose(typeFlight, txt, origin, destiny){
        if (typeFlight === "1 parada") {
            elements.push({
                textStrong: `${origin} a Bogotá`,
                textSub: `Vuelo de ${txt} (1 de 2)`
            });
            elements.push({
                textStrong: `Bogotá a ${destiny}`,
                textSub: `Vuelo de ${txt} (2 de 2)`
            });
        } else if (typeFlight === "Directo") {
            elements.push({
                textStrong: `${origin} a ${destiny}`,
                textSub: `Vuelo de ${txt}`
            });
        }
    }

    // Generar elementos de ida y vuelta
    travelsChoose(typeGoingTxt, 'ida', originTxt, destinyTxt);
    travelsChoose(typeLapTxt, 'vuelta', destinyTxt, originTxt);

    // Función para actualizar el carrusel
    function updateCarousel() {
        carouselContent.innerHTML = `
            <div class="sub-header__element">
                <p class="sub-header__txt--strong">${elements[currentIndex].textStrong}</p>
                <p class="sub-header__txt--sub">${elements[currentIndex].textSub}</p>
            </div>
        `;

        // Cambiar texto del boton cuando llegue al ultimo elemento del carrousel
        // if (currentIndex == elements.length - 1){
        //     nextBtn.textContent = "Agregar y continuar";
        // }else{
        //     nextBtn.textContent = "Pasar al siguiente vuelo";
        // }

        // Actualizar visibilidad y desactivación de las flechas
        prevArrow.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        prevArrow.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextArrow.style.visibility = currentIndex === elements.length - 1 ? 'hidden' : 'visible';
        nextArrow.style.pointerEvents = currentIndex === elements.length - 1 ? 'none' : 'auto';
    }

    // Manejo de eventos para las flechas
    prevArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentIndex < elements.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Inicializar carrusel
    updateCarousel();

    var row = 30;

    function renderAirplane(row){
        const airplaneContainer = document.getElementById('airplane');
        airplaneContainer.innerHTML = "";

        const airplaneChairC = document.createElement('div');
        airplaneChairC.classList.add('airplane__chair-contend');

        const airplaneExit = document.createElement('div');
        airplaneExit.classList.add('airplane__exit');

        if (row >= 3){
            airplaneChairC.innerHTML = `
                <div class="airplane__chair-row">
                    <div onclick="chooseChair(event, 'A', ${row})" idchair="${row}A" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                    <div onclick="chooseChair(event, 'B', ${row})" idchair="${row}B" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                    <div onclick="chooseChair(event, 'C', ${row})" idchair="${row}C" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                    <div class="airplane__chair">${row}</div> 
                    <div onclick="chooseChair(event, 'D', ${row})" idchair="${row}D" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                    <div onclick="chooseChair(event, 'E', ${row})" idchair="${row}E" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                    <div onclick="chooseChair(event, 'F', ${row})" idchair="${row}F" class="airplane__chair ${getRandomClass(10, row)}"></div> 
                </div>
            `;

            if(row == 13 || row == 12 ){
                airplaneChairC.innerHTML += `
                    <div class="airplane__exit">
                        <svg width="67" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(0, 33.5 4)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.328 7.854L.146 4.672a.5.5 0 010-.708L3.328.782a.5.5 0 01.708.708L1.707 3.818H4.5a.5.5 0 010 1H1.707l2.329 2.328a.5.5 0 01-.708.708zm60.445-3.536a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5H54a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.181 0a.5.5 0 01.5-.5h2.09a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1H21a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5z" fill="#303030"></path></g></svg>
                        <span class="airplane__exit-txt">SALIDA DE EMERGENCIA</span>
                        <svg width="67" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(180, 33.5 4)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.328 7.854L.146 4.672a.5.5 0 010-.708L3.328.782a.5.5 0 01.708.708L1.707 3.818H4.5a.5.5 0 010 1H1.707l2.329 2.328a.5.5 0 01-.708.708zm60.445-3.536a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5H54a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.181 0a.5.5 0 01.5-.5h2.09a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.09a.5.5 0 110 1H21a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 110 1h-2.09a.5.5 0 01-.5-.5zm-6.182 0a.5.5 0 01.5-.5h2.091a.5.5 0 010 1h-2.09a.5.5 0 01-.5-.5z" fill="#303030"></path></g></svg>
                    </div>
                `;
            }

            row--;
        }else {
            return;
        }

        renderAirplane(row);
        airplaneContainer.appendChild(airplaneChairC);
    }

    // Renderizar el plano del avion
    renderAirplane(row);

    // Obtener una clase con numeros aleatorios
    function getRandomClass(max, row) {
        var classChoose = "";
        const numRandom = Math.floor(Math.random() * max);

        if(row >= 8){
            if(numRandom > 5){
                classChoose = "chair__disabled";
            }else{
                classChoose = "chair__standard";
            }
        }else{
            if(numRandom > 5){
                classChoose = "chair__disabled";
            }else{
                classChoose = "chair__first";
            }
        }


        return classChoose;
    }

    // Funcion para mostrar los asientos de cada pasajero
    function renderAirplaneChairs(){
        const passengersTxt = document.getElementById('passengersTxt').value;
        const passengersArray = passengersTxt
            .replace(/\[|\]|/g, '')
            .split(',')
            .map(Number);

        var amountPassengers = 0;

        for (var i=0; i<passengersArray.length; i++){
            amountPassengers += passengersArray[i];
        }

        const airplaneChair = document.getElementById('airplaneChair');
        airplaneChair.innerHTML = "";

        for (var i=0; i<passengersArray.length; i++){
            for (var o=0; o<passengersArray[i]; o++){
                var typePassenger = "";

                if(i == 0){
                    typePassenger = `Adulto ${o+1}`;
                }else if(i == 1){
                    typePassenger = `Niño ${o+1}`;
                }else{
                    return;
                }

                const airplaneChairElement = document.createElement('div');
                airplaneChairElement.classList.add('airplane__float-element');

                airplaneChairElement.innerHTML = `
                    <div class="airplane__float-chair"><span idChairP="NULL" class="airplane__code">--</span></div>
                    <span class="airplane__float-name">${typePassenger}</span>
                `;

                airplaneChairElement.addEventListener('click', () => markPositionChair(event));
                airplaneChair.appendChild(airplaneChairElement);
                markPositionChair('00');
            }
        }
    }

    renderAirplaneChairs();
});

// Funcion para marcar silla escogida como seleccionada
function chooseChair(event, column, row){
    const element = event.target;

    // Validamos que no se pueda escoger el mismo asiento mas de 1 vez
    if(element.classList.contains('chair__first-confirmed') || element.classList.contains('chair__standard-confirmed')){
        return;
    }

    // Limpiamos
    clearSelectionChair();
    renderChairSelected(element, column, row);

    if(element.classList.contains('chair__first')){
        element.classList.add('chair__first-selected');
    }else if(element.classList.contains('chair__standard')){
        element.classList.add('chair__standard-selected');
    }
}

// Funcion para renderizar información de la silla escogida
function renderChairSelected(element, column, row){
    var classElement = "";

    if(element.classList.contains('chair__disabled')){
        return;
    }else if(element.classList.contains('chair__first')){
        classElement = "first";
    }else if(element.classList.contains('chair__standard')){
        classElement = "standard";
    }

    // Cargamos la informacion necesaria a renderizar
    const info = loadInfoPassenger(column, row);

    const infoChairContainer = document.getElementById('infoChair');
    infoChairContainer.classList.remove('hidde');
    infoChairContainer.innerHTML = "";

    var elementContent = document.createElement('div');

    elementContent.innerHTML = `
        <div class="box__close" onclick="clearSelectionChair()"></div>

        <div class="box__content">
            <div class="box__data">
                <p>${info[3]}</p>
                <strong><span id="">${row}${column}</span> ${info[0]}</strong>
            </div>
            <div class="box__price">COP ${info[4]}</div>
        </div>

        <div class="box__wrapper">
            <div class="box__top">
                <span style="color: ${info[2]};">${info[1]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" color="${info[2]}" focusable="false" viewBox="0 0 32 32"><path d="M27.5509 7.7749L16.001 19.3599L4.45097 7.7749L2.00098 10.2249L16.001 24.2249L30.001 10.2249L27.5509 7.7749Z" fill="currentColor"></path></svg>
            </div>

            <div class="box__bot ${classElement}">
                <div class="box__element">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" color="rgb(27, 0, 136)" focusable="false" viewBox="0 0 32 32"><path d="M2.44139 5.10565C2.60441 5.04844 2.75117 5.06478 2.89789 5.14651C3.04461 5.22824 3.14212 5.34266 3.19917 5.50611L8.79105 23.805C9.02743 24.6305 9.34524 25.3088 9.72834 25.8237C10.1114 26.3468 10.5599 26.739 11.0652 27.0088C11.2771 27.115 11.5216 27.2049 11.7824 27.2703C12.0514 27.3357 12.3284 27.3684 12.6218 27.3684C13.2087 27.3684 13.9179 27.2213 14.7575 26.927C15.597 26.6328 16.2656 26.3958 16.7709 26.2078C17.2763 26.0199 17.5694 25.9136 17.6509 25.8891C17.7324 25.8646 17.8469 25.8728 18.0099 25.93C18.1729 26.0117 18.2788 26.1261 18.3522 26.2895C18.4174 26.453 18.4255 26.6083 18.3685 26.7718C18.344 26.8535 18.2952 26.9189 18.23 26.9679C18.1648 27.0251 18.0914 27.0578 18.0099 27.0905C17.7735 27.1722 17.5207 27.2621 17.2517 27.3684C16.7463 27.5563 16.0371 27.8097 15.116 28.1284C14.195 28.4472 13.3801 28.6106 12.6628 28.6106C12.2634 28.6106 11.8804 28.5698 11.5217 28.488C11.1631 28.4063 10.8207 28.2919 10.5028 28.1284C9.83446 27.7852 9.25544 27.2785 8.76638 26.6246C8.27732 25.9708 7.87816 25.1535 7.58472 24.1646L2.03383 5.86572C1.97678 5.70226 1.99292 5.55515 2.07443 5.40804C2.16409 5.26093 2.28652 5.16286 2.44139 5.10565ZM12.9887 6.11092C12.9887 6.85464 12.7198 7.50845 12.19 8.05602C11.6601 8.6036 11.0081 8.8733 10.2338 8.8733C9.45945 8.8733 8.79908 8.6036 8.25296 8.05602C7.70684 7.50845 7.43786 6.86282 7.43786 6.11092C7.43786 5.3345 7.70684 4.67249 8.25296 4.12491C8.79908 3.57733 9.45945 3.30763 10.2338 3.30763C11.0081 3.30763 11.6601 3.5855 12.19 4.12491C12.7198 4.67249 12.9887 5.3345 12.9887 6.11092ZM11.7498 6.11092C11.7498 5.68593 11.603 5.31815 11.3096 5.00758C11.0162 4.69702 10.6577 4.54991 10.2338 4.54991C9.80995 4.54991 9.45105 4.70519 9.15761 5.00758C8.86417 5.31815 8.71742 5.68593 8.71742 6.11092C8.71742 6.5359 8.86417 6.89549 9.15761 7.18971C9.45105 7.48393 9.80995 7.63105 10.2338 7.63105C10.6577 7.63105 11.0162 7.48393 11.3096 7.18971C11.603 6.89549 11.7498 6.5359 11.7498 6.11092ZM24.5713 20.3234C24.3349 19.6532 23.9764 19.1629 23.5118 18.8441C23.0472 18.5254 22.4766 18.3619 21.8164 18.3619H16.2655C16.1024 18.3619 15.9718 18.3211 15.8659 18.2394C15.7599 18.1576 15.6947 18.0514 15.6621 17.9206L14.2683 12.9188C14.1053 12.3876 13.7793 11.9708 13.2658 11.6766C12.7604 11.3824 12.1979 11.3415 11.5866 11.554L10.2254 11.9545L12.8256 20.4051L18.776 21.3287C18.9635 21.3532 19.1019 21.4349 19.1916 21.5657C19.2812 21.6964 19.3139 21.8435 19.2895 22.007C19.265 22.195 19.1835 22.3339 19.053 22.4238C18.9226 22.5137 18.7597 22.5546 18.5723 22.5219L12.2632 21.5575C12.1572 21.5575 12.0593 21.5166 11.9615 21.4349C11.8719 21.3532 11.8069 21.2633 11.7824 21.157L8.86429 11.742C8.83983 11.554 8.84783 11.3905 8.90488 11.2434C8.95379 11.0963 9.0764 10.9982 9.26388 10.941L11.22 10.3362C12.1819 10.042 13.054 10.1074 13.8528 10.5324C14.6516 10.9574 15.1814 11.6275 15.4504 12.5347L16.7299 17.1033H21.8C22.7048 17.1033 23.4954 17.3403 24.1801 17.8062C24.8566 18.272 25.3864 18.9585 25.7613 19.8657L29.0786 29.1582C29.1275 29.3217 29.1275 29.4769 29.0623 29.6404C28.9971 29.8039 28.8831 29.9101 28.72 29.9591C28.6956 29.9837 28.6713 30 28.6631 30C28.6468 30 28.6307 30 28.6062 30H28.5246C28.3616 30 28.231 29.9673 28.125 29.9019C28.0191 29.8365 27.9539 29.7385 27.9213 29.5995L24.5713 20.3234ZM30 10.5569C30 11.415 29.7633 12.0689 29.2987 12.5429C28.8341 13.0088 28.1741 13.2458 27.3183 13.2458H21.3272C21.1397 13.2458 20.9848 13.1885 20.8707 13.066C20.7484 12.9434 20.6916 12.8044 20.6916 12.6492V4.72153C20.6916 3.86339 20.9279 3.20138 21.4088 2.71919C21.8897 2.23699 22.5497 2 23.4056 2H29.356C29.5435 2 29.6984 2.05719 29.8125 2.17978C29.9348 2.30237 29.9916 2.44132 29.9916 2.5966V10.5569H30ZM23.4139 3.22592C22.9086 3.22592 22.5417 3.34849 22.3135 3.5855C22.0852 3.82251 21.9712 4.19848 21.9712 4.7052V11.9953H27.3262C27.8316 11.9953 28.1985 11.8809 28.4267 11.6521C28.6549 11.4232 28.769 11.0555 28.769 10.5487V3.21774H23.4139V3.22592Z" fill="currentColor"></path></svg>
                    <span>Elige el asiento de tu preferencia</span>
                </div>
                <div class="box__element">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" color="#800F71" focusable="false" viewBox="0 0 32 32"><path d="M16.6923 26.6971C16.4754 26.7719 16.2438 26.854 15.9969 26.9513C15.5331 27.1233 14.8674 27.3629 13.9997 27.6695C13.132 27.9762 12.4061 28.1257 11.8151 28.1257C11.471 28.1257 11.1272 28.0884 10.7906 28.0136C10.4465 27.9388 10.1171 27.8191 9.80292 27.6471C9.18953 27.3329 8.666 26.8691 8.22466 26.2706C7.78332 25.6722 7.4318 24.9241 7.1625 24.019L2.03105 7.23304C1.97869 7.08344 1.9935 6.94124 2.06831 6.79163C2.14311 6.64203 2.26261 6.55986 2.43466 6.53742C2.58426 6.48505 2.71896 6.49987 2.8536 6.57467C2.98825 6.64948 3.0781 6.76182 3.13047 6.90395L8.26192 23.6899C8.70326 25.1561 9.36932 26.121 10.2595 26.5847C11.1497 27.0485 12.1969 27.086 13.3937 26.6971C13.88 26.525 14.3138 26.3753 14.6729 26.2407C15.0394 26.106 15.3461 25.9938 15.5929 25.8891C16.0567 25.7171 16.3261 25.6199 16.4009 25.5975C16.4757 25.575 16.5804 25.5824 16.73 25.6347C16.8796 25.7095 16.9766 25.8219 17.0214 25.964C17.0663 26.1136 17.0663 26.2556 17.0214 26.4052C16.999 26.48 16.9542 26.5399 16.8943 26.5922C16.8345 26.6371 16.7671 26.6746 16.6923 26.6971ZM12.0697 7.49475C12.0697 8.17546 11.8229 8.77399 11.3366 9.27518C10.8504 9.77636 10.2517 10.0232 9.54104 10.0232C8.8304 10.0232 8.22472 9.77636 7.72353 9.27518C7.22235 8.77399 6.97549 8.18294 6.97549 7.49475C6.97549 6.78411 7.22235 6.17825 7.72353 5.67706C8.22472 5.17587 8.8304 4.92902 9.54104 4.92902C10.2517 4.92902 10.8504 5.18336 11.3366 5.67706C11.8303 6.17825 12.0697 6.78411 12.0697 7.49475ZM10.9327 7.49475C10.9327 7.10577 10.798 6.76926 10.5287 6.485C10.2594 6.20075 9.93002 6.06606 9.54104 6.06606C9.15205 6.06606 8.82305 6.20823 8.55375 6.485C8.28446 6.76926 8.14978 7.10577 8.14978 7.49475C8.14978 7.88373 8.28446 8.21292 8.55375 8.48221C8.82305 8.75151 9.15205 8.88618 9.54104 8.88618C9.93002 8.88618 10.2594 8.75151 10.5287 8.48221C10.8055 8.21292 10.9327 7.88373 10.9327 7.49475ZM26.4395 29.3749H26.2898C26.1701 29.3749 26.0579 29.3376 25.9607 29.2628C25.8634 29.188 25.8036 29.1056 25.7736 29.0084L22.6916 20.5033C22.4747 19.9422 22.1457 19.5084 21.7193 19.2017C21.2929 18.895 20.7693 18.7303 20.1633 18.7079H15.0692C14.9195 18.7079 14.8 18.6705 14.7028 18.5957C14.6056 18.5209 14.5455 18.4238 14.5231 18.3041L13.2367 13.726C13.0871 13.2398 12.7877 12.8582 12.3239 12.5889C11.8601 12.3196 11.3439 12.2823 10.7829 12.4768L9.53373 12.8433L11.9199 20.578L17.3808 21.4233C17.5529 21.4458 17.6799 21.5206 17.7622 21.6403C17.8445 21.76 17.8745 21.8947 17.852 22.0443C17.8296 22.2163 17.7547 22.3435 17.6351 22.4258C17.5154 22.5081 17.3659 22.5454 17.1938 22.5154L11.4038 21.6328C11.2841 21.6104 11.1795 21.5655 11.0897 21.5057C11.0074 21.4459 10.9474 21.3635 10.925 21.2663L8.28456 12.6488C8.26212 12.4768 8.26946 12.3271 8.32182 12.1925C8.3667 12.0578 8.47886 11.9681 8.65091 11.9158L10.4465 11.3697C11.3292 11.1004 12.1296 11.1603 12.8627 11.5492C13.5957 11.9382 14.0819 12.5516 14.3288 13.3819L15.5031 17.5635H20.156C21.0387 17.586 21.7791 17.8103 22.3925 18.2217C23.0059 18.6406 23.4696 19.2615 23.7837 20.0918L26.8285 28.5971C26.8734 28.7467 26.8734 28.8887 26.8135 29.0383C26.7537 29.1879 26.649 29.2853 26.4994 29.3302L26.4618 29.3674H26.4395V29.3749ZM27.0677 13.4343C26.6264 13.6812 26.1702 13.8682 25.6915 14.0028C25.2127 14.1375 24.719 14.2048 24.2104 14.2048C22.6245 14.2048 21.2631 13.6363 20.1411 12.4993C19.019 11.3623 18.458 10.0008 18.458 8.415C18.458 6.82916 19.019 5.46757 20.1411 4.33055C21.2631 3.19353 22.617 2.625 24.2104 2.625C24.7714 2.625 25.3097 2.69983 25.8259 2.84196C26.342 2.99157 26.8286 3.2086 27.2924 3.50033C27.4644 3.59758 27.5614 3.71724 27.5838 3.85189C27.6063 3.98654 27.569 4.13604 27.4717 4.30809C27.3969 4.42778 27.2845 4.51011 27.12 4.54751C26.9629 4.58492 26.8211 4.56242 26.7014 4.4951C26.3124 4.24825 25.9157 4.06873 25.5118 3.94905C25.1078 3.82936 24.6741 3.76204 24.2104 3.76204C22.9611 3.76204 21.8837 4.2259 20.9636 5.15347C20.051 6.08104 19.5873 7.17326 19.5873 8.415C19.5873 9.66423 20.0435 10.7488 20.9636 11.6764C21.8837 12.6039 22.9611 13.0678 24.2104 13.0678C25.0931 13.0678 25.8934 12.8508 26.6115 12.4094C27.3297 11.9681 27.8907 11.392 28.2797 10.6889C28.4741 10.3448 28.6236 9.97828 28.7209 9.5893C28.8181 9.20031 28.8706 8.80399 28.8706 8.415C28.8706 8.24296 28.9228 8.10078 29.035 7.99606C29.1472 7.89133 29.2819 7.83151 29.4539 7.83151C29.6036 7.83151 29.7309 7.88385 29.8356 7.99606C29.9404 8.10826 30 8.25044 30 8.415C30 9.49218 29.7306 10.4721 29.1921 11.3622C28.6535 12.2524 27.9429 12.9406 27.0677 13.4343ZM24.2403 11.5642C24.188 11.5867 24.1354 11.6165 24.0756 11.6389C24.0157 11.6614 23.9561 11.6764 23.9112 11.6764H23.8363C23.8139 11.6764 23.7839 11.6764 23.7615 11.6764C23.739 11.6764 23.709 11.6614 23.6866 11.6389C23.5893 11.6165 23.5072 11.5567 23.4473 11.4744C23.3875 11.3921 23.3575 11.2874 23.3575 11.1603V10.0232H21.9286C21.779 10.0232 21.6595 9.97089 21.5623 9.87365C21.465 9.7764 21.4125 9.65672 21.4125 9.50711V7.63701C21.4125 7.48741 21.4575 7.36773 21.5623 7.27048C21.6595 7.17324 21.779 7.12073 21.9286 7.12073C22.0782 7.12073 22.2056 7.17324 22.3103 7.27048C22.4225 7.36773 22.4747 7.48741 22.4747 7.63701V8.95357H23.9035C24.0532 8.95357 24.173 9.00591 24.2703 9.11812C24.3675 9.23032 24.4197 9.3575 24.4197 9.49963V9.97829L26.1776 8.40003L24.7115 7.00859V7.26299C24.7115 7.4126 24.659 7.53978 24.5617 7.6445C24.4645 7.75671 24.345 7.80905 24.1954 7.80905C24.0458 7.80905 23.9184 7.75671 23.8137 7.6445C23.709 7.5323 23.6493 7.40512 23.6493 7.26299V5.79686C23.6493 5.57993 23.7615 5.41525 23.9784 5.30304C24.1954 5.19084 24.3897 5.22084 24.5617 5.39289L27.3446 8.0335C27.3895 8.05594 27.4268 8.10076 27.4567 8.16061C27.4792 8.22045 27.494 8.30278 27.494 8.40003C27.494 8.49727 27.4792 8.57943 27.4418 8.63927C27.4044 8.69911 27.3595 8.75893 27.3147 8.80382L24.2403 11.5642Z" fill="currentColor"></path></svg>
                    <span>Siéntate en la parte delantera del avión</span>
                </div>
                <div class="box__element">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" color="#800F71" focusable="false" viewBox="0 0 32 32"><path d="M17.3901 3.68143C16.991 3.68143 16.6359 3.81983 16.3344 4.09665C16.0328 4.37347 15.8823 4.71087 15.8823 5.10015C15.8823 5.51538 16.0328 5.87002 16.3344 6.14684C16.6359 6.42366 16.9821 6.57071 17.3901 6.57071C17.7892 6.57071 18.1352 6.43231 18.419 6.14684C18.7028 5.87002 18.8529 5.51538 18.8529 5.10015C18.8529 4.71087 18.7116 4.37347 18.419 4.09665C18.1263 3.81983 17.7892 3.68143 17.3901 3.68143ZM17.3901 7.8683C16.6185 7.8683 15.9534 7.59153 15.3947 7.04654C14.836 6.50155 14.552 5.85275 14.552 5.10015C14.552 4.34755 14.836 3.69866 15.3947 3.17097C15.9534 2.64328 16.6185 2.37518 17.3901 2.37518C18.1616 2.37518 18.8177 2.64328 19.3586 3.17097C19.9085 3.69866 20.1745 4.33889 20.1745 5.10015C20.1745 5.85275 19.9085 6.50155 19.3586 7.04654C18.8265 7.60018 18.1616 7.8683 17.3901 7.8683ZM12.9645 29.9447C12.8226 30.2215 12.6103 30.3686 12.3176 30.3686C12.291 30.3686 12.2554 30.3599 12.2111 30.3513C12.1667 30.334 12.1225 30.3167 12.0604 30.2907C11.9185 30.2302 11.8117 30.1263 11.7408 29.9792C11.6699 29.8235 11.6605 29.6505 11.7226 29.4602L13.6565 25.308L15.2882 20.0743C15.3414 19.8234 15.5188 19.6677 15.8026 19.6158C16.0598 19.5639 16.2722 19.6418 16.4496 19.8667L20.0593 24.6419C20.0859 24.6678 20.1039 24.7024 20.1216 24.7457C20.1394 24.7889 20.139 24.8409 20.139 24.8928L21.212 29.59C21.2386 29.7544 21.2124 29.9101 21.1237 30.0485C21.035 30.1869 20.9104 30.282 20.7331 30.3426C20.5646 30.4031 20.396 30.3772 20.2186 30.2821C20.0501 30.1869 19.9439 30.0484 19.9173 29.8841L18.8884 25.3166L16.1395 21.6747L14.8889 25.7405L12.9645 29.9447ZM8.76069 30.3686C8.73409 30.3686 8.69851 30.3599 8.65417 30.3513C8.60983 30.334 8.56555 30.3253 8.50347 30.3253C8.33497 30.2647 8.21068 30.1609 8.13973 29.9879C8.06878 29.8235 8.0781 29.6506 8.15792 29.4862L10.3923 23.7422L12.4146 16.4151L13.8341 9.29568C13.8607 9.15727 13.9669 9.02745 14.1354 8.915C14.3039 8.77659 14.4814 8.73331 14.6499 8.78522L16.5388 9.24372H16.6271C17.1149 9.40808 17.5227 9.6071 17.8508 9.83201C18.179 10.0569 18.4538 10.3424 18.6667 10.6884C18.8795 11.0431 19.1459 11.7005 19.4652 12.678L20.4048 15.3165L24.8746 16.787C25.0431 16.8389 25.1767 16.9601 25.2565 17.1244C25.3452 17.2888 25.3539 17.4532 25.3007 17.6262C25.2386 17.7906 25.1325 17.9203 24.9551 18.0068C24.7866 18.0933 24.6092 18.102 24.4407 18.0501L19.6687 16.4584C19.4381 16.4065 19.2969 16.2594 19.2348 16.0431L18.2059 13.0673C17.9487 12.3147 17.7533 11.813 17.6291 11.5621C17.4961 11.3113 17.3369 11.1122 17.1329 10.9565C16.9378 10.8008 16.6358 10.6537 16.2278 10.5153L15.0223 10.2212L13.7362 16.6747L11.6343 24.0882L9.35481 29.9534C9.3282 30.0658 9.25791 30.1609 9.14262 30.2474C9.0362 30.3253 8.90259 30.3686 8.76069 30.3686ZM7.94487 16.5449C7.85618 16.8477 7.66135 17.0033 7.34209 17.0033H7.21824C7.18277 17.0033 7.15564 16.9947 7.12904 16.9601C6.96054 16.8996 6.82779 16.7958 6.74797 16.6487C6.65929 16.493 6.64173 16.3372 6.7038 16.1642L8.16658 11.7264C8.19318 11.6659 8.21965 11.614 8.24625 11.5535C8.27286 11.5016 8.31755 11.441 8.37963 11.3891L11.5546 9.20919C11.6965 9.09673 11.8646 9.06214 12.0508 9.10539C12.2371 9.14864 12.3885 9.23509 12.5038 9.3735C12.6191 9.51191 12.6538 9.67633 12.6095 9.85799C12.5651 10.0397 12.4768 10.1694 12.3349 10.2559L9.32883 12.3061L7.94487 16.5449Z" fill="currentColor"></path></svg>
                    <span>Embarca y desembarca con prioridad</span>
                </div>
            </div>
        </div>

        <button onclick="confirmChairSelection('${column}', '${row}', '${info[4]}')" class="box__btn">Elegir este asiento</button>
    `;

    infoChairContainer.appendChild(elementContent);
}

// Limpiamos seleccion de silla marcada
function clearSelectionChair(){
    const elements = document.querySelectorAll('.airplane__chair');

    elements.forEach(function(el){
        el.classList.remove('chair__first-selected');
        el.classList.remove('chair__standard-selected');
    })

    const infoChairContainer = document.getElementById('infoChair');
    infoChairContainer.classList.add('hidde');
    infoChairContainer.innerHTML = "";

    const deleteChairContainer = document.getElementById('deleteChair');
    deleteChairContainer.classList.add('hidde');
    deleteChairContainer.innerHTML = "";
}

let arrayPricesChair = [];

// Funcion para confirmar la silla escogida
function confirmChairSelection(column, row, priceChair){
    const chairPassengers = document.querySelectorAll('.airplane__float-element');
    const chairsAllowed = document.querySelectorAll('.airplane__chair');
    const amountChairPassengers = chairPassengers.length;

    for (var i=0; i<amountChairPassengers; i++){
        if(chairPassengers[i].classList.contains('active')){
            // Asiento escogigo por el pasajero && Valor del asiento escogigo por el pasajero
            var chairPassenger = chairPassengers[i].querySelector('span.airplane__code');
            var valueChairPassenger = chairPassenger.getAttribute('idChairP');

            // Verificamos si el pasajero ya eligio con anterioridad un asiento
            if(valueChairPassenger != "NULL"){
                var sw = false;

                // Buscamos el asiento elegido para cambiarlo
                for (var index=0; !sw; index++){
                    // Asientos disponibles && Valor del asiento disponible por {index}
                    var chairID = chairsAllowed[index];
                    var valueChairID = chairID.getAttribute('idChair');

                    if(valueChairPassenger == valueChairID){
                        if(chairID.classList.contains('chair__first-confirmed')){
                            chairID.classList.remove('chair__first-confirmed');
                        }else if(chairID.classList.contains('chair__standard-confirmed')){
                            chairID.classList.remove('chair__standard-confirmed');
                        }

                        sw = true;
                    }
                }
            }

            const chairFirstSelect = document.querySelector('.chair__first-selected');
            const chairStandardSelect = document.querySelector('.chair__standard-selected');

            if(chairFirstSelect){
                chairFirstSelect.classList.replace("chair__first-selected", 'chair__first-confirmed');
            }else if(chairStandardSelect){
                chairStandardSelect.classList.replace("chair__standard-selected", 'chair__standard-confirmed');
            }

            chairPassengers[i].classList.remove('active');
            chairPassengers[i].classList.add('confirmed');

            if(row <= 7){
                chairPassengers[i].querySelector('div.airplane__float-chair').classList.add('first');
            }else{
                chairPassengers[i].querySelector('div.airplane__float-chair').classList.remove('first');
            }

            chairPassengers[i].querySelector('span.airplane__code').textContent = row+column;
            chairPassengers[i].querySelector('span.airplane__code').setAttribute('idChairP', row+column);

            document.getElementById('priceGoing').value = priceChair;
            // priceChairInput.value = priceChair;

            arrayPricesChair.push();

            // Buscamos la siguiente posición
            markPositionChair('00');
            // Limpiamos sillas elegidas anteriormente
            clearSelectionChair();
            // Salimos de la función para no buscar mas
            return;
        }
    }

    clearSelectionChair();
}

// Funcion para marcar la posicion del elemento a escoger silla
function markPositionChair(event){
    const chairPassengers = document.querySelectorAll('.airplane__float-element');
    const amountChairPassengers = chairPassengers.length; 

    // Limpiamos cada elemento
    for (var ct=0; ct<amountChairPassengers; ct++){
        chairPassengers[ct].classList.remove('active');
    }

    // Validamos si se envio una posición especifica
    if(event != '00'){
        const element = event.currentTarget;
        element.classList.add('active');
        const valueID = element.querySelector("span.airplane__code").getAttribute('idchairp');

        clearSelectionChair();

        if(valueID != "NULL"){
            deleteChair(valueID, false);
        }

        return;
    }

    // Marcamos en orden
    for (var ct=0; ct<amountChairPassengers; ct++){
        if(!chairPassengers[ct].classList.contains('confirmed')){
            chairPassengers[ct].classList.add('active');
            return;
        }

        if(ct+1 == amountChairPassengers){
            chairPassengers[ct++].classList.add('active');
        }
    }
}

// Función para renderizar y/o eliminar un asiento escogido
function deleteChair(valueID, sw){
    // Usamos una expresión regular para dividir números y letras
    const match = valueID.match(/^(\d+)([A-Za-z]+)$/);
    var row = "";
    var column = "";

    // Guardamos respectivamenye la fila y columna
    if (match) {
        row = match[1];
        column = match[2];
    }

    // Cargamos la informacion necesaria
    const info = loadInfoPassenger(column, row);
    var className = "";

    if(row <= 7){
        className = "first";
    }

    const deleteChairContent = document.getElementById('deleteChair');
    deleteChairContent.classList.remove('hidde');
    deleteChairContent.innerHTML = `
        <div class="box__close" onclick="clearSelectionChair()"></div>

        <div class="box__content box__content--padding">
            <div class="box__content-wrapper">
                <div class="airplane__float-chair ${className}"><span idChairP="NULL" class="airplane__code">${valueID}</span></div>

                <div class="box__data">
                    <p>${info[3]}</p>
                    <span class="box__data-txt"><strong style="color: ${info[2]};">${info[1]}</strong> - ${info[0]}</span>
                </div>
            </div>

            <div class="box__price box__price--small">COP ${info[4]}</div>
        </div>

        <button class="box__btn" onclick="deleteChair('${valueID}', true);">Eliminar o cambiar asiento</button>
    `;

    if(sw){
        const chairPassengers = document.querySelectorAll('.airplane__float-element');
        const amountChairPassengers = chairPassengers.length;
        const chairsAllowed = document.querySelectorAll('.airplane__chair');
        const amountChairsAllowed = chairsAllowed.length;

        var a = false, b = false;
        var index = 0, index1 = 0;

        while(!a && index < amountChairPassengers){
            var chairPassenger = chairPassengers[index].querySelector('span.airplane__code');
            var valueChairPassenger = chairPassenger.getAttribute('idChairP');

            if(valueID == valueChairPassenger){
                a = true;
            }

            index++;
        }

        while (!b && index1 < amountChairsAllowed) {
            var chairID = chairsAllowed[index1];
            var valueChairID = chairID.getAttribute('idChair');

            if(valueID == valueChairID){
                b = true;
            }

            index1++;
        }

        if(a && b){
            const passenger = chairPassengers[index-1].querySelector('div.airplane__float-chair');

            chairPassengers[index-1].querySelector('span.airplane__code').setAttribute('idChairP', "NULL");
            chairPassengers[index-1].querySelector('span.airplane__code').textContent = "--";

            if(passenger.classList.contains('first')){
                passenger.classList.remove('first');
                chairsAllowed[index1-1].classList.remove('chair__first-confirmed');
            }else{
                chairsAllowed[index1-1].classList.remove('chair__standard-confirmed');
            }
        }
    }
}

// Información necesaria para renderizar al escoger sillas
function loadInfoPassenger(column, row){
    var type = [];
    var price = 0;

    switch(column) {
        case "A":
        case "F":
            type[0] = "Ventana";
            price = 19800;
            break;
        case "B":
        case "E":
            type[0] = "Medio";
            price = 17500;
            break;
        case "C":
        case "D":
            type[0] = "Pasillo";
            price = 19800;
            break;
    }

    if(row < 8){
        price += (column == "B" || column == "E") ? 13900 : 14200;
        type[1] = "Más adelante"; 
        type[2] = "#800F71"; 
    }else{
        type[1] = "Estándar"; 
        type[2] = "#1b0088";
    }

    // Formateo del precio agregando el punto y coma
    price = price.toLocaleString();

    const chairPassengers = document.querySelectorAll('.airplane__float-element');
    const amountChairPassengers = chairPassengers.length;
    const arrayPriceTxt = document.getElementById('arrayPriceTxt').value;
    const pricesArray = arrayPriceTxt
        .replace(/\[|\]|/g, '')
        .split(',')
        .map(Number);

    // Sumamos los precios escogidos
    let total = 0;
    for(let i = 0; i < pricesArray.length-1; i++){
        total+=pricesArray[i] * amountPassengersWOB;
    }

    // Sumar flexibilidad por pasajero
    total += (pricesArray[2] * amountChairPassengers);
    total = total.toLocaleString();
    document.getElementById('totalToPay').textContent = total;

    var ct = 0;
    var sw = false;

    while (!sw && ct < amountChairPassengers) {
        if(chairPassengers[ct].classList.contains('active')){
            type[3] = chairPassengers[ct].querySelector('span.airplane__float-name').textContent;
            sw = true;
        }

        ct++;
    }

    const arrayReturn = [type[0], type[1], type[2], type[3], price];

    return arrayReturn;
}

setTimeout(() => {
    loadInfoPassenger(0, 0);
}, 10);