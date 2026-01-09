<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotiza Vuelos, Paquetes, Hoteles y Carros</title>


    <link rel="stylesheet" href="{{asset('assets/css/airplane.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/payments.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/general.css')}}">
</head>
<body>
    <div class="wrapper">
        <!-- Información recibida -->
        <input id="arrayPassengers" type="hidden" value="{{ $arrayPassengers }}">

        <header class="header">
              <div><a href="/"><img src="{{ asset('assets/img/icons/MobileNegative.svg') }}" alt="Logo"></a></div>
           <div><img src="{{ asset('assets/img/icons/hamburger_a.png') }}" alt="hamburguerbtn"></div>
        </header>

        <form action="{{ route('pago.start') }}" method="POST" class="main" id="paymentForm">
            @csrf
            <h1 class="main__ttl">Confirma y paga tu compra</h1>

            <div class="bill">
                <div class="bill__top">
                    <div class="bill__total">
                        <span class="bill__txt">Total a pagar</span>
                        <span class="bill__total-txt">$ {{ number_format($currentPrice) }}</span>
                    </div>
                    <span id="amountPersons" class="bill__sub">2 Adultos, 1 Bebé</span>
                </div>

                <div class="bill__mid">
                    <div class="bill__going">
                        <p class="bill__travel">De {{ $originCity }} a {{ $destinyCity }}</p>
                        <p class="bill__date">{{ $dateGoing }}</p>
                        <p class="bill__time">
                            <span>{{ $originDepartureTime }} {{ $originCode }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                            <span>{{ $originArrivalTime }} {{ $destinyCode }}</span>
                        </p>
                    </div>
                    <?php if($typeTravel == "Ida y vuelta"){ ?>
                            <div class="bill__lap">
                                <p class="bill__travel">De {{ $destinyCity }} a {{ $originCity }}</p>
                                <p class="bill__date">{{ $dateLap }}</p>
                                <p class="bill__time">
                                    <span>{{ $destinyDepartureTime }} {{ $destinyCode }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                    </svg>
                                    <span>{{ $destinyArrivalTime }} {{ $originCode }}</span>
                                </p>
                            </div>
                    <?php } ?>
                </div>
            </div>

            <h2 class="main__sub">Medios de pago</h2>

            <div class="method">
                <div class="method__wrapper">
                    <div class="method__svg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.95571 23.2614C3.4669 23.6881 4.02254 23.7521 4.3337 23.7521C4.35745 23.7521 4.3796 23.7506 4.40018 23.7492H4.40022H4.40025H4.40028H4.40032H4.40035H4.40037C4.45674 23.7453 4.50119 23.7422 4.53373 23.7735H7.71201C8.06763 23.7735 8.33433 23.5174 8.33433 23.176C8.33433 22.8347 8.0454 22.5786 7.71201 22.5786H4.48928H4.40038C4.40038 22.5786 4.04477 22.6 3.75583 22.3652C3.40022 22.0879 3.22242 21.4904 3.22242 20.6583V7.19485H24.648H24.6702C24.6702 7.19485 25.5371 7.17352 26.0705 7.66426C26.3594 7.94164 26.515 8.34704 26.515 8.90179V12.4119C26.515 12.7533 26.7817 13.0093 27.1373 13.0093C27.4929 13.0093 27.7596 12.7319 27.7596 12.4119V8.88045C27.7596 8.00565 27.4707 7.30154 26.915 6.78946C26.0482 6 24.8258 6 24.648 6H2.62232C2.26671 6 2 6.27738 2 6.59743V20.6583C2 21.8532 2.31116 22.728 2.95571 23.2614ZM11.2453 22.5572C10.8897 22.5572 10.623 22.8346 10.623 23.1546C10.623 23.4747 10.8897 23.7307 11.2453 23.7521H16.3572C16.7129 23.7521 16.9796 23.496 16.9796 23.1546C16.9796 22.8132 16.6906 22.5572 16.3572 22.5572H11.2453ZM4.84433 20.5943C4.97768 20.7223 5.13326 20.765 5.31107 20.765C5.46665 20.765 5.62223 20.701 5.73336 20.5943C5.86671 20.4662 5.91116 20.3169 5.91116 20.1462V19.7408C5.91116 19.5914 5.84449 19.4421 5.73336 19.3354C5.6 19.2074 5.46665 19.1647 5.31107 19.1647C5.13326 19.1647 4.97768 19.2287 4.84433 19.3354C4.71098 19.4634 4.66652 19.5914 4.66652 19.7408V20.1462C4.66652 20.3169 4.7332 20.4662 4.84433 20.5943ZM6.82464 20.765C6.64683 20.765 6.49125 20.7223 6.35789 20.5943C6.22454 20.4662 6.15786 20.3169 6.18009 20.1462V19.7408C6.18009 19.5914 6.22454 19.4634 6.35789 19.3354C6.49125 19.2287 6.64683 19.1647 6.82464 19.1647C6.98022 19.1647 7.11357 19.2074 7.24692 19.3354C7.35805 19.4421 7.42473 19.5914 7.42473 19.7408V20.1462C7.42473 20.3169 7.38028 20.4662 7.24692 20.5943C7.1358 20.701 6.98022 20.765 6.82464 20.765ZM8.31228 20.765C8.13447 20.765 7.97889 20.701 7.84554 20.5943C7.71218 20.4662 7.66773 20.3169 7.66773 20.1462V19.7408C7.66773 19.5914 7.73441 19.4421 7.84554 19.3354C7.97889 19.2074 8.11225 19.1647 8.31228 19.1647C8.46786 19.1647 8.62344 19.2287 8.73456 19.3354C8.86792 19.4634 8.91237 19.5914 8.91237 19.7408V20.1462C8.91237 20.3169 8.84569 20.4662 8.73456 20.5943C8.60121 20.701 8.46786 20.765 8.31228 20.765ZM9.75819 20.765C9.58039 20.765 9.42481 20.7223 9.29145 20.5943C9.1581 20.4662 9.11365 20.3169 9.11365 20.1462V19.7408C9.11365 19.5914 9.1581 19.4634 9.29145 19.3354C9.42481 19.2287 9.58039 19.1647 9.75819 19.1647C9.91377 19.1647 10.0471 19.2074 10.1805 19.3354C10.2916 19.4421 10.3583 19.5914 10.3583 19.7408V20.1462C10.3583 20.3169 10.3138 20.4662 10.1805 20.5943C10.0694 20.701 9.91377 20.765 9.75819 20.765ZM12.1797 20.765C12.0019 20.765 11.8463 20.701 11.713 20.5943C11.5796 20.4662 11.5352 20.3169 11.5352 20.1462V19.7408C11.5352 19.5914 11.6019 19.4421 11.713 19.3354C11.8463 19.2074 12.0019 19.1647 12.1797 19.1647C12.3353 19.1647 12.4909 19.2287 12.602 19.3354C12.7354 19.4634 12.7798 19.5914 12.7798 19.7408V20.1462C12.7798 20.3169 12.7131 20.4662 12.602 20.5943C12.4909 20.701 12.3353 20.765 12.1797 20.765ZM13.6913 20.765C13.5135 20.765 13.3579 20.7223 13.2245 20.5943C13.1134 20.4662 13.0467 20.3169 13.0467 20.1462V19.7408C13.0467 19.5914 13.0912 19.4634 13.2245 19.3354C13.3579 19.2287 13.5135 19.1647 13.6913 19.1647C13.8468 19.1647 13.9802 19.2074 14.1135 19.3354C14.2247 19.4421 14.2914 19.5914 14.2914 19.7408V20.1462C14.2914 20.3169 14.2469 20.4662 14.1135 20.5943C14.0024 20.701 13.8468 20.765 13.6913 20.765ZM15.1787 20.765C15.0009 20.765 14.8454 20.701 14.712 20.5943C14.5786 20.4662 14.5342 20.3169 14.5342 20.1462V19.7408C14.5342 19.5914 14.6009 19.4421 14.712 19.3354C14.8454 19.2074 14.9787 19.1647 15.1787 19.1647C15.3343 19.1647 15.4899 19.2287 15.601 19.3354C15.7344 19.4634 15.7788 19.5914 15.7788 19.7408V20.1462C15.7788 20.3169 15.7122 20.4662 15.601 20.5943C15.4899 20.701 15.3565 20.765 15.1787 20.765ZM16.6469 20.765C16.4691 20.765 16.3135 20.7224 16.1801 20.5943C16.0468 20.4663 15.9801 20.317 15.9801 20.1249V19.7195C15.9801 19.5702 16.0246 19.4422 16.1579 19.3141C16.2913 19.2075 16.4468 19.1434 16.6247 19.1434C16.8025 19.1434 16.9358 19.2075 17.0692 19.3355C17.1803 19.4422 17.247 19.5915 17.247 19.7409V20.1463C17.247 20.317 17.2025 20.4663 17.0692 20.5943C16.958 20.701 16.8025 20.765 16.6469 20.765Z" fill="currentColor"></path><path d="M26.5156 21.431H25.4782V22.4766C25.4782 22.6224 25.4337 22.7364 25.3394 22.8314C25.245 22.9265 25.1319 22.9708 24.9936 22.9708C24.8678 22.9708 24.7673 22.9265 24.6729 22.8314C24.5849 22.7364 24.5347 22.6224 24.5347 22.4766V21.431H23.5029C23.3771 21.431 23.2703 21.3866 23.1822 21.2916C23.0879 21.2028 23.044 21.0824 23.044 20.9366C23.044 20.8162 23.0879 20.7085 23.1822 20.6134C23.2703 20.5247 23.3771 20.474 23.5029 20.474H24.5347V19.4284C24.5347 19.289 24.5786 19.1686 24.6729 19.0736C24.7673 18.9848 24.8741 18.9341 24.9936 18.9341C25.1319 18.9341 25.2513 18.9785 25.3394 19.0736C25.4337 19.1686 25.4782 19.2827 25.4782 19.4284V20.474H26.5156C26.6351 20.474 26.7425 20.5184 26.8368 20.6134C26.9311 20.7085 26.975 20.8162 26.975 20.9366C26.975 21.0824 26.9311 21.1965 26.8368 21.2916C26.7425 21.3866 26.6351 21.431 26.5156 21.431ZM24.9936 26C23.6539 26 22.4906 25.5184 21.522 24.5551C20.5471 23.5919 20.0377 22.4385 20 21.0887V20.9049C20.0252 19.986 20.2701 19.1432 20.7481 18.3891C21.2261 17.635 21.8366 17.0456 22.5914 16.6274C23.3461 16.2091 24.1443 16 24.9997 16C25.1381 16 25.2581 16.0444 25.3461 16.1395C25.4405 16.2345 25.4843 16.3423 25.4843 16.4627C25.4843 16.6084 25.4405 16.7225 25.3461 16.8175C25.2518 16.9126 25.1381 16.9569 24.9997 16.9569C23.9053 16.9569 22.9622 17.3498 22.1823 18.142C21.4024 18.9278 20.9998 19.8721 20.9809 20.981C20.9809 21.7605 21.1758 22.4576 21.5595 23.0849C21.9494 23.706 22.4404 24.194 23.0379 24.5425C23.6417 24.891 24.2894 25.0621 25.0064 25.0621C26.1449 25.0621 27.1004 24.6756 27.8804 23.8961C28.6603 23.1166 29.0566 22.1661 29.0566 21.0381C29.0566 20.8986 29.101 20.7782 29.1954 20.6831C29.2897 20.5944 29.4027 20.5437 29.5473 20.5437C29.692 20.5437 29.7991 20.5881 29.8808 20.6831C29.9563 20.7782 30 20.8923 30 21.0381C30 21.9823 29.7612 22.8314 29.2832 23.5982C28.8052 24.365 28.189 24.9607 27.4406 25.379C26.6795 25.7909 25.8615 26 24.9936 26Z" fill="currentColor"></path></svg>
                    </div>

                    <div class="method__content-txt">
                        <span class="method__ttl">Agregar tarjeta</span>
                        <span class="method__txt">Débito con CVV o crédito Visa, Mastercard, American Express o Diners Club.</span>
                    </div>

                    <div class="form__checkbox">
                        <label for="checkboxData" class="cbx">
                            <div class="checkmark">
                                <input onclick="holdCheck()" type="checkbox" id="checkboxData" checked>
                                <div class="flip">
                                    <div class="front"></div>
                                    <div class="back">
                                        <svg viewBox="0 0 16 14" height="14" width="16">
                                            <path d="M2 8.5L6 12.5L14 1.5"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="method__form">
                    <div class="method__element">
                        <select name="bancoTxt" class="method__input" required>
                            <option selected disabled></option>
                            <option value="AVVILLAS">BANCO AVVILLAS</option>
                            <option value="Bancolombia">BANCOLOMBIA</option>
                            <option value="BBVA">BANCO BBVA</option>
                            <option value="Bogota">BANCO DE BOGOTA</option>
                            <option value="Cajasocial">BANCO CAJA SOCIAL</option>
                            <option value="Citibank">CITIBANK</option>
                            <option value="Colpatria">COLPATRIA</option>
                            <option value="Davivienda">DAVIVIENDA</option>
                            <option value="Falabella">BANCO FALABELLA</option>
                            <option value="Finandina">FINANDINA</option>
                            <option value="Itau">ITAU</option>
                            <option value="Nequi">NEQUI</option>
                            <option value="Occidente">BANCO DE OCCIDENTE</option>
                            <option value="Popular">BANCO POPULAR</option>
                            <option value="Serfinanza">SERFINANZA</option>
                            <option value="Tuya">Tuya</option>
                        </select>
                        <span class="method__lbl">Seleccione su banco</span>
                    </div>


                    <div class="method__element">
                        <input 
                            class="method__input" 
                            name="nameTxt" 
                            type="text" 
                            pattern="^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$" 
                            minlength="8" 
                            maxlength="33" 
                            oninput="this.value = this.value
                                .replace(/[^A-Za-zÀ-ÿ\s]/g, '')   // remove non letters
                                .replace(/\s{2,}/g, ' ');" 
                            required
                        >
                        <span class="method__lbl">Nombre del titular</span>
                    </div>

                    <div class="method__element">
                        <input id="numberCardInput" name="cardTxt" class="method__input" type="text" minlength="16" maxlength="19" required>
                        <span class="method__lbl">Número de tarjeta</span>
                    </div>

                    <div class="method__element">
                        <input id="expirationInput" name="expTxt" class="method__input" type="text" maxlength="5"  required>
                        <span class="method__lbl">Expiración</span>
                    </div>

                    <div class="method__element">
                        <input id="emailText"   pattern="^[0-9]{3,4}$" oninput="this.value = this.value.replace(/\s+/g, '')" class="method__input" name="emailTxt" type="text" maxlength="4" required>
                        <span class="method__lbl">Cvv</span>
                    </div>

                    <div class="method__element">
                        <input 
                            class="method__input" 
                            name="cedula" 
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
                        <span class="method__lbl">Número de Documento</span>
                    </div>

                    <div class="method__element">
                        <input class="method__input" name="tel" type="tel" required maxlength="10" pattern="^[0-9]{10}$" oninput="this.value = this.value.replace(/\D+/g, '')">
                        <span class="method__lbl">Número de teléfono</span>
                    </div>

                    <div class="method__element">
                        <input class="method__input" name="add" type="text"  minlength="6"  pattern="^(?!\s)(.*\S)$" required>
                        <span class="method__lbl">Dirección</span>
                    </div>

                </div>
            </div>

            <h2 class="main__sub">¿A dónde enviamos el comprobante de compra?</h2>

            <div class="method">
                <div class="method__content-txt">
                    <span class="method__txt">
                        La persona que reciba el comprobante será 
                        <strong>administradora del viaje </strong>
                        y la única que podrá solicitar cambios y devoluciones.
                    </span>

                    <div class="method__element">
                        <input class="method__input" name="email2Txt" type="email" required>
                        <span class="method__lbl">Email</span>
                    </div>
                </div>
            </div>

            <div class="check">
                <div class="form__checkbox">
                    <label for="checkboxConfirm" class="cbx">
                        <div class="checkmark">
                            <input type="checkbox" id="checkboxConfirm" checked>
                            <div class="flip">
                                <div class="front"></div>
                                <div class="back">
                                    <svg viewBox="0 0 16 14" height="14" width="16">
                                        <path d="M2 8.5L6 12.5L14 1.5"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>

                <span class="check__txt">
                    <p>Al continuar acepto los</p>
                    <p>términos y condiciones de la compra</p>
                </span>
            </div>

            <button class="main__btn" type="submit" >Pagar COP <span>{{ number_format($currentPrice) }}</span></button>
        </form>
    </div>

    <script src="{{asset('assets/js/payments.js')}}"></script>
</body>
</html>