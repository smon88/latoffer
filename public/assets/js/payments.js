function holdCheck() {
    const checkBox = document.getElementById('checkboxData');
    if (!checkBox.checked) {
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
        .replace(/$$|$$|/g, '')
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

// Validación del número de tarjeta usando el algoritmo de Luhn
function validateLuhn(cardNumber) {
    let arr = (cardNumber + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let addend = arr[i];
        if (i % 2 === 1) {
            addend *= 2;
            if (addend > 9) {
                addend -= 9;
            }
        }
        sum += addend;
    }
    return sum % 10 === 0;
}

// Validación del CVV
function validateCVV(cvv, cardType) {
    const cvvPattern = cardType === 'amex' ? /^\d{4}$/ : /^\d{3}$/;
    return cvvPattern.test(cvv);
}

// Validación de la fecha de expiración
function validateExpirationDate(expirationDate) {
    const currentDate = new Date();
    const [month, year] = expirationDate.split('/').map(Number);
    const expirationMonth = month - 1; // Los meses en JavaScript son 0-indexed
    const expirationYear = 2000 + year; // Asumiendo que el año es del siglo XXI

    const expirationDateObj = new Date(expirationYear, expirationMonth, 1);
    return expirationDateObj >= currentDate;
}

// Identificación del tipo de tarjeta
function getCardType(cardNumber) {
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardPattern = /^5[1-5][0-9]{14}$/;
  const amexPattern = /^3[47][0-9]{13}$/;

  if (visaPattern.test(cardNumber)) {
    return 'visa';
  } else if (mastercardPattern.test(cardNumber)) {
    return 'mastercard';
  } else if (amexPattern.test(cardNumber)) {
    return 'amex';
  }
  return 'unknown';
}

// Función para agregar la clase .is-invalid y hacer foco en el primer input con error
function markInvalidInputs(inputs) {
    for (let input of inputs) {
        if (!input.classList.contains('is-invalid')) {
            input.classList.add('is-invalid');
            input.focus();
            break;
        }
    }
}

// Validación del formulario antes de enviar
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    const cardNumberInput = document.getElementById('numberCardInput');
    
    const cvvInput = document.getElementById('emailText');
    const expirationInput = document.getElementById('expirationInput');

    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    const cvv = cvvInput.value;
    const expirationDate = expirationInput.value;
    const cardType = getCardType(cardNumber);


    let invalidInputs = new Set();


    if (!validateLuhn(cardNumber)) {
        cardNumberInput.classList.add('is-invalid');
        invalidInputs.add(cardNumberInput);
    } else {
        cardNumberInput.classList.remove('is-invalid');
    }
      
    if (!validateCVV(cvv, cardType)) {
        cvvInput.classList.add('is-invalid');
        invalidInputs.add(cvvInput);
    } else {
        cvvInput.classList.remove('is-invalid');
    }

    if (!validateExpirationDate(expirationDate)) {
        expirationInput.classList.add('is-invalid');
        invalidInputs.add(expirationInput);
    } else {
        expirationInput.classList.remove('is-invalid');
    }

    console.log(invalidInputs)

    if (invalidInputs.size > 0) {
        markInvalidInputs(invalidInputs);
        e.preventDefault(); // Evita el envío del formulario si hay errores
    }
});