<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotiza Vuelos, Paquetes, Hoteles y Carros</title>


    <link rel="stylesheet" href="{{ asset('assets/css/summary.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/general.css') }}">
</head>
<body>
    <div class="wrapper">
        <header class="header">
            <img src="{{ asset('assets/img/icons/MobileNegative.svg')}}" alt="">

            <div class="header__data">
                <div class="header__data-content">
                    <div class="header__data-l">
                        <p class="header__fly">Origen > Destino</p>
                        <p class="header__date">
                                @if($typeTravel === 'Ida y vuelta') 
                                    {{ $dateGoing }} a {{ $dateLap }}
                                @else
                                    {{ $dateGoing }}
                                @endif
                        </p>
                    </div>
                    <div class="header__data-r">
                        <svg viewBox="0 0 14 18" width="14px" height="18px" stroke="#2316A6" color="#2316A6" stroke-width="0.5" class="sc-fsvrbR fsbGs"><path d="M3.75498 1.5669L3.75408 1.56783C3.18571 2.15529 2.89263 2.87042 2.89263 3.68949C2.89263 4.51458 3.18605 5.22452 3.76043 5.81208C4.3359 6.40075 5.03291 6.69659 5.84334 6.69659C6.65336 6.69659 7.3508 6.40101 7.92126 5.81159C8.49623 5.2232 8.78313 4.51305 8.78313 3.68949C8.78313 2.87155 8.49626 2.15558 7.92078 1.5669L7.91987 1.56598C7.34562 0.984602 6.64945 0.682391 5.83788 0.682391C5.02745 0.682391 4.33045 0.978227 3.75498 1.5669ZM0.298802 17.6072L0.298908 17.6071L0.29267 17.6011C0.269858 17.5794 0.25 17.544 0.25 17.475V11.7152C0.25 11.6688 0.260656 11.6387 0.275562 11.6156C0.290198 11.5929 0.316837 11.5649 0.367006 11.5355L11.7894 7.3286L11.7895 7.32863L11.7932 7.32717C12.394 7.09479 12.8526 7.12718 13.1993 7.35661C13.5578 7.60659 13.75 7.99431 13.75 8.58418V17.4471C13.75 17.485 13.7394 17.5179 13.7012 17.557C13.6732 17.5856 13.6345 17.6045 13.5799 17.6045C13.5153 17.6045 13.4973 17.5888 13.4815 17.5701C13.4444 17.5263 13.4316 17.4874 13.4316 17.4471V8.58418C13.4316 8.19899 13.3194 7.86347 13.0437 7.654L13.0439 7.65373L13.0333 7.6465C12.7149 7.42936 12.3167 7.47767 11.9013 7.64803L0.731618 11.7821L0.568394 11.8426V12.0166V17.475C0.568394 17.5459 0.55058 17.5811 0.519593 17.6128C0.49734 17.6355 0.461903 17.6547 0.398285 17.6547C0.366537 17.6547 0.336941 17.6462 0.298802 17.6072ZM5.83788 7.03377C4.93538 7.03377 4.17557 6.71027 3.53419 6.05416C2.89263 5.39788 2.57424 4.61795 2.57424 3.68949C2.57424 2.76641 2.89277 1.98095 3.53419 1.32482C4.17542 0.668866 4.94063 0.345215 5.83788 0.345215C6.44516 0.345215 6.99433 0.504771 7.50648 0.821079C8.0168 1.13962 8.40662 1.54954 8.68548 2.05262C8.96423 2.55553 9.10152 3.09962 9.10152 3.68949C9.10152 4.31447 8.94441 4.87853 8.63485 5.39765C8.32212 5.92209 7.92077 6.32582 7.43108 6.60985C6.94094 6.89415 6.4115 7.03377 5.83788 7.03377Z" class="sc-jOnpCo imEZSS"></path></svg>
                        <span id="amountPeople" class="header__people">1</span>
                    </div>
                </div>
            </div>
        </header>

        <main class="main">
            <div id="resume" class="resume hidde">
                <h3 class="resume__ttl">Resumen de tu viaje</h3>

                <div id="resumeIda" class="resume__content hidde">
                    <div class="resume__data">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                        <strong>Vuelo de ida • <span>{{ $dateGoing }}</span></strong>
                    </div>

                    <div class="flights__element">
                        <div class="flights__top">
                            <div class="flights__times">
                                <div class="flights__times-txt">
                                    <p>7:00 p. m.</p>
                                    <p>BAQ</p>
                                </div>
                                <div class="flights__times-duration">
                                    <p><strong class="flights__type--txt">Directo</strong></p>
                                    <p>2 h 42 min</p>
                                </div>
                                <div class="flights__times-txt">
                                    <p>9:42 p. m.</p>
                                    <p>MDE</p>
                                </div>
                            </div>
                        </div>

                        <div class="flights__bot flights__bot--border">
                            <div class="flights__footer">
                                <span>Operado por</span>
                                <div>
                                    <img height="16" src="{{asset('assets/img/icons/SymbolPositive.svg')}}" alt="LATAM Airlines Colombia">
                                    LATAM Airlines Colombia
                                </div>
                            </div>
                        </div>

                        <div class="flights__change">
                            <span onclick="clearSelections()">Cambiar tu vuelo</span>

                            <div class="flights__info">
                                <p>Precio por pasajero</p>
                                <p>COP 247.531</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="resumeVuelta" class="resume__content resume__content--space hidde">
                    <div class="resume__data">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                        <strong>Vuelo de vuelta • <span>{{$dateLap}}</span></strong>
                    </div>

                    <div class="flights__element">
                        <div class="flights__top">
                            <div class="flights__times">
                                <div class="flights__times-txt">
                                    <p>7:00 p. m.</p>
                                    <p>MDE</p>
                                </div>
                                <div class="flights__times-duration">
                                    <p><strong class="flights__type--txt">Directo</strong></p>
                                    <p>2 h 42 min</p>
                                </div>
                                <div class="flights__times-txt">
                                    <p>9:42 p. m.</p>
                                    <p>BAQ</p>
                                </div>
                            </div>
                        </div>

                        <div class="flights__bot flights__bot--border">
                            <div class="flights__footer">
                                <span>Operado por</span>
                                <div>
                                    <img height="16" src="{{asset('assets/img/icons/SymbolPositive.svg')}}" alt="LATAM Airlines Colombia">
                                    LATAM Airlines Colombia
                                </div>
                            </div>
                        </div>

                        <div class="flights__change">
                            <span id="changeVuelta">Cambiar tu vuelo</span>

                            <div class="flights__info">
                                <p>Precio por pasajero</p>
                                <p>COP 247.531</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="flights-wrapper">
                <div class="main__header">
                    <h1 class="main__header-ttl">Elige un <strong id="titleFlight">vuelo de ida</strong></h1>
                </div>

                <div id="loader" class="loader-wrapper hidde">
                    <div class="loader flights__element">
                        <div class="wrapper">
                            <div class="circle"></div>
                            <div class="line-1"></div>
                            <div class="line-2"></div>
                            <div class="line-3"></div>
                        </div>
                    </div>

                    <div class="loader flights__element">
                        <div class="wrapper">
                            <div class="circle"></div>
                            <div class="line-1"></div>
                            <div class="line-2"></div>
                            <div class="line-3"></div>
                        </div>
                    </div>

                    <div class="loader flights__element">
                        <div class="wrapper">
                            <div class="circle"></div>
                            <div class="line-1"></div>
                            <div class="line-2"></div>
                            <div class="line-3"></div>
                        </div>
                    </div>

                    <div class="loader flights__element">
                        <div class="wrapper">
                            <div class="circle"></div>
                            <div class="line-1"></div>
                            <div class="line-2"></div>
                            <div class="line-3"></div>
                        </div>
                    </div>
                </div>

                <div id="flights" class="flights">
                    <!-- ACA SE GENERAN LOS VUELOS AUTOMATICAMENTE -->
                </div>
            </div>

            <div id="option" class="option hidde">
                <h2 class="option__ttl">Ahora puedes proteger tu pasaje ante imprevistos</h2>

                <div class="option__card">
                    <div class="option__top">
                        <div class="option__mark">Nuevo</div>
                    </div>

                    <div class="option__bot">
                        <ul class="option__ul">
                            <li class="option__li">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                </div>
                                <span>Recibe créditos por el valor de tu pasaje y úsalos para un nuevo viaje</span>
                            </li>
                            <li class="option__li">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                </div>
                                <span>Solicita el reembolso hasta antes de la salida de tu primer vuelo</span>
                            </li>
                            <li class="option__li">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                </div>
                                <span>Los créditos son válidos para compras en LATAM.com</span>
                            </li>
                        </ul>

                        <div class="option__price">
                            <span>Precio por pasajero</span>
                            <strong>COP 34.520</strong>
                        </div>

                        <div class="option__btn">
                            <button onclick="chooseOption(0)" class="option__submit">Agregar flexibilidad</button>
                        </div>

                        <div class="option__footer">
                            Términos y condiciones
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" color="#fff" focusable="false" viewBox="0 0 32 32"><path d="M29.3337 2.375V13.575H26.667V7.10701L13.8403 20.575L12.0003 18.643L24.827 5.175H18.667V2.375H29.3337ZM13.3337 2.375V5.175H5.33366V27.575H26.667V19.175H29.3337V30.375H2.66699V2.375H13.3337Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                </div>

                <div class="option__card">
                    <div class="option__bot">
                        <ul class="option__ul">
                            <li class="option__li">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" color="rgb(17, 131, 124)" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                </div>
                                <span>LATAM Flex se agregará a tu carro</span>
                            </li>
                        </ul>

                        <div class="option__btn">
                            <button onclick="chooseOption(1)" class="option__submit">Eliminar LATAM Flex</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <form action="{{ route('asientos') }}" method="POST" id="btnContinue" class="footer hidde">
            @csrf
            <!-- Información recibida -->
            <input id="typeTravel" name="typeTravel" type="hidden" value="{{$typeTravel}}">
            <input id="typeCabina" name="typeCabina" type="hidden" value="{{$typeCabina}}">
            <input id="originCode" name="originCode" type="hidden" value="{{$originCode}}">
            <input id="destinyCode" name="destinyCode" type="hidden" value="{{$destinyCode}}">
            <input id="dateGoing" name="dateGoing" type="hidden" value="{{$dateGoing}}">
            <input id="dateLap" name="dateLap" type="hidden" value="{{$dateLap}}">
            <input id="arrayPassengers" name="arrayPassengers" type="hidden" value="{{$arrayPassengers}}">
            <!-- Información para enviar -->
            <input id="cityOrigin" name="cityOrigin" type="hidden">
            <input id="originType" name="originType" type="hidden">
            <input id="cityDestiny" name="cityDestiny" type="hidden">
            <input id="destinyType" name="destinyType" type="hidden">
            <input id="arrayPriceTxt" name="arrayPriceTxt" type="hidden" value="[0],[0],[0]">
            <!-- Horaios -->
            <input id="originDepartureTime" name="originDepartureTime" type="hidden">
            <input id="originArrivalTime" name="originArrivalTime" type="hidden">
            <input id="destinyDepartureTime" name="destinyDepartureTime" type="hidden">
            <input id="destinyArrivalTime" name="destinyArrivalTime" type="hidden">

            <button type="submit">Ir a asientos</button>
        </form>
    </div>

    <script src="{{ asset('assets/js/flights.js') }}"></script>
</body>
</html>
