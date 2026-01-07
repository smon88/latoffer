<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotiza Vuelos, Paquetes, Hoteles y Carros</title>
    <link rel="stylesheet" href="{{asset('assets/css/airplane.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/general.css')}}">
</head>
<body>
    <div class="wrapper">
        <!-- Información a enviar -->
        <input id="priceGoing" type="text" value="0">
        <input id="priceLap" type="text" value="0">

        <header class="header">
            <img src="{{ asset('assets/img/icons/MobileNegative.svg') }}" alt="">

            <div class="sub-header">
                <p class="sub-header__txt">Elige tus asientos</p>

                <div class="sub-header__carrousel">
                    <div class="sub-header__arrow sub-header__arrow--prev">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" color="#fff" focusable="false" viewBox="0 0 32 32">
                            <path d="M24.2246 27.55L12.6396 16L24.2246 4.44999L21.7746 2L7.77462 16L21.7746 30L24.2246 27.55Z" fill="currentColor"></path>
                        </svg>
                    </div>

                    <div class="sub-header__content">
                        <!-- Los elementos del carrusel serán generados aquí dinámicamente -->
                    </div>

                    <div class="sub-header__arrow sub-header__arrow--next">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" color="#fff" focusable="false" viewBox="0 0 32 32">
                            <path d="M8.16699 4.45004L19.2003 16L8.16699 27.55L10.5003 30L23.8336 16L10.5003 2L8.16699 4.45004Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>            
            </div>
        </header>

        <main class="main">
            <div id="airplaneChair" class="airplane__float">
                <!-- Aqui se renderizan los puestos a escoger -->
            </div>

            <div class="airplane">
                <span class="airplane__name">Airbus 320</span>

                <div class="airplane__content">
                    <div class="airplane__letter-contend">
                        <div class="airplane__letter">A</div>
                        <div class="airplane__letter">B</div>
                        <div class="airplane__letter">C</div>
                        <div class="airplane__letter"></div>
                        <div class="airplane__letter">D</div>
                        <div class="airplane__letter">E</div>
                        <div class="airplane__letter">F</div>
                    </div>

                    <div id="airplane">
                        <!-- Aqui se genera el esquema del avion con JS -->
                    </div>
                </div>
            </div>
        </main>

        <div id="infoChair" class="box hidde">
            <!-- Información adicional del asiento escogido -->
        </div>

        <div id="deleteChair" class="box hidde">
            <!-- Eliminar asiento escogido -->
        </div>

        <footer class="footer">
            <form action="{{ route('equipaje') }}" method="POST">
                @csrf
                <input id="typeTravel" name="typeTravel" type="hidden" value="{{$typeTravel}}">
                <input id="typeCabina" name="typeCabina" type="hidden" value="{{$typeCabina}}">
                <input id="originCode" name="originCode" type="hidden" value="{{$originCode}}">
                <input id="originTxt" name="originCity" type="hidden" value="{{$cityOrigin}}">
                <input id="typeGoingTxt" name="originType" type="hidden" value="{{$originType}}">
                <input id="destinyCode" name="destinyCode" type="hidden" value="{{$destinyCode}}">
                <input id="destinyTxt" name="destinyCity" type="hidden" value="{{$cityDestiny}}">
                <input id="typeLapTxt" name="destinyType" type="hidden" value="{{$destinyType}}">
                <input id="dateGoing" name="dateGoing" type="hidden" value="{{$dateGoing}}">
                <input id="dateLap" name="dateLap" type="hidden" value="{{$dateLap}}">
                <input id="passengersTxt" name="arrayPassengers" type="hidden" value="{{$arrayPassengers}}">
                <input id="arrayPriceTxt" name="arrayPriceTxt" type="hidden" value="{{$arrayPriceTxt}}">
                <!-- Horaios -->
                <input name="originDepartureTime" type="hidden" value="{{$originDepartureTime}}">
                <input name="originArrivalTime" type="hidden" value="{{$originArrivalTime}}">
                <input name="destinyDepartureTime" type="hidden" value="{{$destinyDepartureTime}}">
                <input name="destinyArrivalTime" type="hidden" value="{{$destinyArrivalTime}}">

                <button id="btnContinueC" class="footer__btn" type="submit">Agregar y continuar</button>
            </form>

            <div class="footer__content">
                <span>Precio final <svg height="20" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M4.45004 24.2251L16 12.6401L27.55 24.2251L30 21.7751L16 7.77511L2 21.7751L4.45004 24.2251Z" fill="currentColor"></path></svg></span>
                <span>COP <span id="totalToPay">0</span></span>
            </div>
        </footer>
    </div>

    <script src="{{asset('assets/js/airplane.js')}}"></script>
</body>
</html>