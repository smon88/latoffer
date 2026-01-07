function holdCheck(){
    const checkBox = document.getElementById('checkboxData');
    if (!checkBox.checked){
        checkBox.checked = true;
    }
}


document.getElementById('expirationInput').addEventListener('input', function(e) {
    let input = e.target.value;

    // Eliminar todo lo que no sea dígitos
    input = input.replace(/\D/g, '');

    // Agregar la barra después de los primeros dos dígitos
    if (input.length >= 2) {
        input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }

    // Limitar a 5 caracteres (formato MM/YY)
    e.target.value = input.substring(0, 5);
});

document.getElementById('numberCardInput').addEventListener('input', function(e) {
    let input = e.target.value;

    // Eliminar todo lo que no sea dígitos
    input = input.replace(/\D/g, '');

    // Agregar un espacio cada 4 dígitos
    input = input.replace(/(.{4})/g, '$1 ');

    // Limitar a 19 caracteres (16 dígitos más 3 espacios)
    e.target.value = input.trim().substring(0, 19);
});

function updatePassengerSummary() {
    const passengersTxt = document.getElementById('arrayPassengers').value;
    const arrayPassengers = passengersTxt
        .replace(/\[|\]|/g, '')
        .split(',')
        .map(Number);

    const amountAdult = arrayPassengers[0];
    const amountChild = arrayPassengers[1];
    const amountBaby = arrayPassengers[2];

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
}

updatePassengerSummary();