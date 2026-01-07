const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function generateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();

    for (let i = 0; i < 11; i++) {
        const date = new Date(currentYear, currentMonth + i, 1);
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthDiv = document.createElement('div');
        monthDiv.classList.add('calendar__month');

        const monthHeader = document.createElement('p');
        monthHeader.classList.add('calendar__month-date');
        monthHeader.textContent = `${monthNames[month]} ${year}`;
        monthDiv.appendChild(monthHeader);

        const monthContent = document.createElement('div');
        monthContent.classList.add('calendar__month-content');

        // Adjusting first day to match Monday as first day of the week
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        for (let j = 0; j < adjustedFirstDay; j++) {
            const emptyDiv = document.createElement('div');
            monthContent.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            if (year === currentYear && month === currentMonth && day < currentDate) {
                dayDiv.classList.add('calendar__day-none');
            } else {
                dayDiv.classList.add('calendar__day-available');
                dayDiv.addEventListener('click', () => selectDate(day, month, year, dayDiv));
            }
            dayDiv.textContent = day;
            monthContent.appendChild(dayDiv);
        }

        monthDiv.appendChild(monthContent);
        calendarContainer.appendChild(monthDiv);
    }
}

generateCalendar();

let selectedElements = [];
let datesValidator = [];
let selectedDates = [];
let selectedDatesFormated = [];
let selectedDatesFormatedInput = [];

function selectDate(day, month, year, element) {
    const typeChoose = document.getElementById('typeChoose').textContent.trim();
    const currentDate = new Date(year, month, day);
    const currentDay = formatDay(currentDate.getDay());
    const formattedDate = `${day} de ${formatMonth(month)}. de ${year}`;

    const dateIda = document.getElementById('dateIda');
    const dateVuelta = document.getElementById('dateVuelta');
    console.log(typeChoose)
    if (typeChoose === "Solo ida") {
        document.getElementById('dateIda').textContent = formattedDate;
        selectedDates = [formattedDate];
        selectedElements = [element];
        element.classList.add('selected');
        selectedDatesFormated= [`${currentDay}&nbsp;<b>${day} de ${formatMonth(month)}</b>`];
        selectedDatesFormatedInput = [`${currentDay} ${day} de ${formatMonth(month)}`];

        // Desactivar / Activar boton de confirmación
        document.getElementById('confirmBtn').disabled = dateIda.textContent != "Selecciona" ? false : true;

    } else if (typeChoose === "Ida y vuelta") {

        if (selectedDates.length === 0) {
            datesValidator[0] = currentDate;
            selectedDatesFormated[0] = `${currentDay}&nbsp;<b>${day} de ${formatMonth(month)}</b>`;
            selectedDatesFormatedInput[0] = `${currentDay} ${day} de ${formatMonth(month)}`;

            selectedDates.push(formattedDate);
            dateIda.textContent = formattedDate;
            selectedElements.push(element);
            element.classList.add('selected');

        } else if (selectedDates.length === 1) {
            datesValidator[1] = currentDate;
            selectedDatesFormated[1] = `${currentDay}&nbsp;<b>${day} de ${formatMonth(month)}</b>`;
            selectedDatesFormatedInput[1] = `${currentDay} ${day} de ${formatMonth(month)}`;

            if(datesValidator[0] < currentDate){
                selectedDates.push(formattedDate);
                dateVuelta.textContent = formattedDate;
                selectedElements.push(element);
                element.classList.add('selected');

                markPassingDays(datesValidator[0], datesValidator[1]);
            }else{
                clearSelection();
                datesValidator[0] = currentDate;
                selectedDatesFormated[0] = `${currentDay}&nbsp;<b>${day} de ${formatMonth(month)}</b>`;
                selectedDatesFormatedInput[0] = `${currentDay} ${day} de ${formatMonth(month)}`;

                selectedDates = [formattedDate];
                dateIda.textContent = formattedDate;
                selectedElements = [element];
                element.classList.add('selected');
            }
        } else {
            clearSelection();
            datesValidator[0] = currentDate;
            selectedDatesFormated[0] = `${currentDay}&nbsp;<b>${day} de ${formatMonth(month)}</b>`;
            selectedDatesFormatedInput[0] = `${currentDay} ${day} de ${formatMonth(month)}`;

            
            selectedDates = [formattedDate];
            dateIda.textContent = formattedDate;
            dateVuelta.textContent = "Selecciona";
            selectedElements = [element];
            element.classList.add('selected');
        }

        // Desactivar / Activar boton de confirmación
        document.getElementById('confirmBtn').disabled = dateIda.textContent != "Selecciona" && dateVuelta.textContent != "Selecciona" ? false : true;
    }
}

function markPassingDays(startDate, endDate) {
    const allDays = document.querySelectorAll('.calendar__day-available');

    allDays.forEach(day => {
        const dayText = day.textContent.trim();
        const parentMonthYear = day.closest('.calendar__month').querySelector('.calendar__month-date').textContent.trim();

        const [monthName, year] = parentMonthYear.split(' ');
        const monthIndex = monthNames.indexOf(monthName);

        const dayDate = new Date(year, monthIndex, parseInt(dayText));

        if (dayDate > startDate && dayDate < endDate) {
            day.classList.add('passing');
        } else {
            day.classList.remove('passing');
        }
    });
}

function clearSelection() {
    selectedElements.forEach(elem => elem.classList.remove('selected'));
    selectedElements = [];
    selectedDates = [];

    document.querySelectorAll('.calendar__day-available').forEach(day => {
        day.classList.remove('passing');
    });
}

function formatMonth(monthIndex) {
    const monthNames = [
        'ene', 'feb', 'mar', 'abr', 'may', 'jun',
        'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    return monthNames[monthIndex];
}

function formatDay(dayIndex) {
    const dayNames = [
        'Dom', 'Lun', 'Mar', 'Mie',
        'Jue', 'Vie', 'Sáb'
    ];
    return dayNames[dayIndex];
}

function imprimirFechas() {
    const typeChoose = document.getElementById('typeChoose').textContent;

    if(typeChoose === "Solo ida"){
        document.getElementById('dateChoose').innerHTML = `<span class="fly__input--txt-date"> <span>${selectedDatesFormated[0]}</span> </span>`;
        document.getElementById('dateGoing').value = selectedDatesFormatedInput[0];
    }else{
        document.getElementById('dateChoose').innerHTML = `<span class="fly__input--txt-date"> <span>${selectedDatesFormated[0]}</span> a <span>${selectedDatesFormated[1]}</span></span>`;
        document.getElementById('dateGoing').value = selectedDatesFormatedInput[0];
        document.getElementById('dateLap').value = selectedDatesFormatedInput[1];
    }
}