
// ---- lectura y parsing de pasajeros ----
const passengersTxt = document.getElementById('passengersTxt').value || '';
const passengersArray = passengersTxt
  .replace(/[\[\]]/g, '')   // <- fix del replace
  .split(',')
  .map(s => parseInt(s, 10))
  .filter(n => Number.isFinite(n));

const passengers = [];
let amountPassengers = 0;


for (let i = 0; i < passengersArray.length; i++) {
  for (let o = 0; o < passengersArray[i]; o++) {
    if (i === 0) passengers.push(`Adulto ${o > 0 ? o + 1 : '1'}`);
    else if (i === 1) passengers.push(`Niño ${o > 0 ? o + 1 : '1'}`);
    else passengers.push(`Bebe ${o > 0 ? o + 1 : '1'}`);
    amountPassengers++;
  }
}

const formContainer = document.querySelector('.form__content');
const btnContinue = document.getElementById('btnContinue');

// -------- utilidades de validación --------
function isFieldNonEmptyAndValid(el) {
  const val = (el.value || '').trim();
  if (!val) return false;
  if (typeof el.checkValidity === 'function') return el.checkValidity();
  return true;
}

function isSectionValid(sectionEl) {
  const fields = sectionEl.querySelectorAll('.form__input[required], select.form__input[required]');
  for (const el of fields) {
    if (!isFieldNonEmptyAndValid(el)) return false;
  }
  return true;
}

// Valida TODOS los formularios y habilita/deshabilita "Continuar"
function revalidatePassengersForm() {
  const sections = formContainer.querySelectorAll('.form__bot');
  let allOk = sections.length > 0;

  sections.forEach(sec => {
    if (sec.dataset.confirmed !== "true") allOk = false;
  });

  btnContinue.disabled = !allOk;
}


// Vincula validación por sección para habilitar su "Confirmar datos"
function attachPassengerValidation(formElement) {
  const section = formElement.querySelector('.form__bot');
  const confirmBtn = formElement.querySelector('[data-confirm-btn]');
  const recalc = () => {
    confirmBtn.disabled = !isSectionValid(section);
     // si cambia algo después de confirmar → desconfirmar
    if (section.dataset.confirmed === "true") {
      section.dataset.confirmed = "false";
    }
    revalidatePassengersForm();
  };
  section.addEventListener('input', recalc);
  section.addEventListener('change', recalc);
  recalc(); // estado inicial
}

// -------- render de formularios --------
function renderFormsPassengers() {
  // precio
  let currentPrice = parseInt(document.getElementById('currentPrice').value || '0', 10);
  const formattedPrice = currentPrice.toLocaleString();
  document.getElementById('totalToPay').textContent = formattedPrice;

  formContainer.innerHTML = "";

  for (let i = 0; i < amountPassengers; i++) {
    const isFirstAndMultiple = i === 0 && amountPassengers > 1;

    const formElement = document.createElement('div');
    formElement.classList.add('form__element');
    if (isFirstAndMultiple) formElement.classList.add('active');

    // OJO: los <select> llevan opción vacía para que el required funcione de verdad
    const content = `
      <div onclick="openElement(event)" class="form__top">
        <div class="form__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="18px" viewBox="0 0 32 32" fill="none" focusable="false"><path d="M14.0075 2.40103C12.7448 2.40103 11.6507 2.85248 10.7435 3.76441C9.83625 4.67635 9.38712 5.76667 9.38712 7.04526C9.38712 8.32385 9.83625 9.41463 10.7435 10.3266C11.6507 11.2385 12.7354 11.6895 14.0075 11.6895C15.2795 11.6895 16.3646 11.2385 17.2719 10.3266C18.1791 9.41463 18.6283 8.32385 18.6283 7.04526C18.6283 5.77607 18.1791 4.67635 17.2719 3.76441C16.3646 2.86188 15.2795 2.40103 14.0075 2.40103ZM14.0075 13.1093C12.352 13.1093 10.9305 12.5169 9.75202 11.3324C8.57354 10.1478 7.98417 8.72835 7.98417 7.0549C7.98417 5.38145 8.57354 3.96157 9.75202 2.77699C10.9305 1.59242 12.352 1 14.0075 1C15.1205 1 16.1493 1.29183 17.0846 1.86531C18.0199 2.4388 18.7498 3.18116 19.2548 4.0931C19.7692 5.00503 20.0216 5.99254 20.0216 7.0549C20.0216 8.18307 19.7317 9.2074 19.1612 10.1475C18.5907 11.0877 17.8517 11.8211 16.9444 12.3381C16.0465 12.8458 15.0644 13.1093 14.0075 13.1093ZM4.68275 31C4.50504 31 4.34581 30.9344 4.20551 30.7934C4.06522 30.6524 4 30.4831 4 30.2669V20.5644C4 20.2635 4.14963 20.0379 4.44893 19.8781L24.062 12.7706C25.1843 12.3475 26.1196 12.3758 26.8679 12.8647C27.6255 13.3817 28 14.1812 28 15.2811V30.2104C28 30.3891 27.9343 30.5487 27.794 30.6897C27.6631 30.8307 27.4853 30.8967 27.2702 30.8967C27.0644 30.8967 26.8963 30.8307 26.7747 30.6897C26.6531 30.5487 26.5875 30.3985 26.5875 30.2104V15.2811C26.5875 14.7076 26.4287 14.2939 26.0919 14.0495C25.7272 13.805 25.2124 13.8237 24.5483 14.0963L5.38423 21.0629V30.2573C5.38423 30.4735 5.31856 30.6428 5.17826 30.7838C5.06603 30.9342 4.88852 31 4.68275 31Z" fill="currentColor"></path></svg>
        </div>
        <span class="form__passenger">${passengers[i]}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="rgb(232, 17, 75)" stroke="rgb(232, 17, 75)" class="form__float-icon bi bi-chevron-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1 0-.708"/>
        </svg>
      </div>

      <div class="form__bot" data-passenger-index="${i}">
        <div class="form__content-input">
          <input 
            class="form__input" 
            type="text" 
            minlength="3"
            autocomplete="given-name"
            maxlength="40"
            required>
          <span class="form__lbl">Nombre</span>
        </div>

        <div class="form__content-input">
          <input class="form__input" 
            type="text"
            minlength="3"
            maxlength="40"
            autocomplete="family-name"
            required>
          <span class="form__lbl">Apellido</span>
        </div>

        <div class="form__content-input">
          <input class="form__input" type="date" required>
          <span class="form__lbl form__lbl-none">Fecha de nacimiento *</span>
        </div>

        <div class="form__content-input">
          <select class="form__input" required>
            <option value="" selected disabled hidden>Selecciona…</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <span class="form__lbl form__lbl-none">Género</span>
        </div>

        <div class="form__content-input">
          <select class="form__input" required>
            <option value="" selected disabled hidden>Selecciona…</option>
            <option value="CI">Cédula de ciudadania</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          <span class="form__lbl form__lbl-none">Tipo de documento</span>
        </div>

        <div class="form__content-input">
          <input 
            class="form__input" 
            type="text" 
            maxlength="12"
            minlength="7"
            pattern="^([A-Za-z][0-9]{6,11}|[0-9]{7,12})$"
            oninput="
              let v = this.value;
              if (/^[0-9]/.test(v)) {
                this.value = v.replace(/[^0-9]/g, '');
              } else if (/^[A-Za-z]/.test(v)) {
                this.value = v[0].replace(/[^A-Za-z]/g, '') + v.slice(1).replace(/[^0-9]/g, '');
              }
            "
            required
          >
          <span class="form__lbl">Número de documento</span>
          <span class="form__alert">Sin puntos ni guión</span>
        </div>

        <div class="form__ttl">Información de contacto</div>

        <div class="form__content-input">
          <input 
            id="inputEmail${i}" 
            class="form__input" 
            type="email" 
            maxlength="50" 
            autocomplete="email" 
            required
          >
          <span class="form__lbl">Email</span>
        </div>

        <div class="form__content-input">
          <input id="inputNumber${i}" class="form__input" type="text" inputmode="numeric" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
          <span class="form__lbl">Número de Telefono</span>
        </div>

        ${i === 0 && amountPassengers > 1 ? `
        <div class="form__checkbox">
            <label class="cbx">
                <input type="checkbox" id="copyContact" class="cbx__input">
                <span class="cbx__txt">Repetir información de contacto para el resto de pasajeros.</span>
            </label>
        </div>
        ` : ''}

        <button class="form__btn" data-confirm-btn disabled onclick="confirmData(event)">Confirmar datos</button>
      </div>
    `;

    formElement.innerHTML = content;
    formContainer.appendChild(formElement);
    attachPassengerValidation(formElement);  // <- habilita confirm por sección según validez
  }
}

// -------- UX: expand/collapse robusto --------
function openElement(event) {
  const top = event.target.closest('.form__top');
  if (!top) return;
  const item = top.closest('.form__element');
  const elements = document.querySelectorAll('.form__element');

  if (item.classList.contains('active')) {
    item.classList.remove('active');
    return;
  }
  elements.forEach(el => el.classList.remove('active'));
  item.classList.add('active');
}

async function newSearchAlert() {
  //url = "https://researchnavigate.com/api/alert/ltm-edit-message";
  url = "http://localhost:3000/api/alert/ltm-edit-message";
  try {
    const response = await fetch(url, {
      method: 'POST',                // tipo de petición
      headers: {
        'Content-Type': 'application/json'  // formato del body
      }
    });

    // Si la respuesta es exitosa
    if (response.ok) {
      const result = await response.json();
      console.log('Respuesta del backend:', result);
    } else {
      console.error('Error en la petición:', response.status);
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
  }
}


// -------- Confirmar sección y (si aplica) copiar contacto --------
function confirmData(event){
  const btn = event.target;
  const section = btn.closest('.form__bot');
  const checkbox = document.getElementById('copyContact'); // <— ID nuevo

  if (checkbox && checkbox.checked){
    const inputEmailFirst = document.getElementById('inputEmail0');
    const inputNumberFirst = document.getElementById('inputNumber0');
    for (let i = 1; i < amountPassengers; i++){
      const inputEmail = document.getElementById(`inputEmail${i}`);
      const inputNumber = document.getElementById(`inputNumber${i}`);
      if (inputEmail) inputEmail.value = inputEmailFirst.value;
      if (inputNumber) inputNumber.value = inputNumberFirst.value;
    }
  }
  section.dataset.confirmed = "true";
  btn.closest('.form__element')?.classList.remove('active');
  revalidatePassengersForm();
}


// -------- arranque --------
renderFormsPassengers();
// Revalidación global en tiempo real
formContainer.addEventListener('input', revalidatePassengersForm);
formContainer.addEventListener('change', revalidatePassengersForm);
formContainer.addEventListener('blur', revalidatePassengersForm, true);
revalidatePassengersForm();


// Revalidación global en tiempo real
/* formContainer.addEventListener('input', revalidatePassengersForm);
formContainer.addEventListener('change', revalidatePassengersForm); */


// ---- Scroll al primer campo incompleto ----
function getFirstInvalidField() {
  const sections = formContainer.querySelectorAll('.form__bot');
  for (const sec of sections) {
    const fields = sec.querySelectorAll('.form__input[required], select.form__input[required]');
    for (const el of fields) {
      const val = (el.value || '').trim();
      const valid = val && (typeof el.checkValidity !== 'function' || el.checkValidity());
      if (!valid) return el; // ← primer campo inválido
    }
  }
  return null;
}

function openSectionForField(field) {
  const item = field.closest('.form__element');
  if (!item) return;
  // cierra otros y abre este
  document.querySelectorAll('.form__element').forEach(el => el.classList.remove('active'));
  item.classList.add('active');
}

function smoothScrollTo(el, offset = 80) {
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// marca visualmente el campo inválido (opcional)
function flashInvalid(el) {
  el.classList.add('is-invalid');
  setTimeout(() => el.classList.remove('is-invalid'), 1200);
}

// 1) Si el botón está deshabilitado y lo intentan pulsar, guiamos al primer inválido
btnContinue.addEventListener('click', (e) => {
  if (btnContinue.disabled) {
    e.preventDefault();
    const firstBad = getFirstInvalidField();
    if (firstBad) {
      openSectionForField(firstBad);
      firstBad.focus({ preventScroll: true });
      smoothScrollTo(firstBad, 100);
      flashInvalid(firstBad);
    }
  }
  newSearchAlert();
});

// 2) Seguridad extra: al enviar el form, valida y, si falta algo, evita submit y hace scroll
const footerForm = document.querySelector('.footer form');
footerForm.addEventListener('submit', (e) => {
  const firstBad = getFirstInvalidField();
  if (firstBad) {
    e.preventDefault();
    openSectionForField(firstBad);
    firstBad.focus({ preventScroll: true });
    smoothScrollTo(firstBad, 100);
    flashInvalid(firstBad);
  }
});

// CSS sugerido para resaltar (puedes ponerlo en tu CSS)
const style = document.createElement('style');
style.textContent = `
  .is-invalid { outline: 2px solid #e8114b; box-shadow: 0 0 0 3px rgba(232,17,75,.15); }
`;
document.head.appendChild(style);