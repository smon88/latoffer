<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotiza Vuelos, Paquetes, Hoteles y Carros</title>


    <link rel="stylesheet" href="{{ asset('assets/css/airplane.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/passengers.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/general.css') }}">

    <style>
        #btnContinue {
            border-radius: 8px;
            color: #fff;
            background-color: rgb(232, 17, 75);
            border: 1px solid rgb(232, 17, 75);
            cursor: pointer;
        }

    </style> 
</head>
<body>
    <div class="wrapper">
        <header class="header">
           <div><a href="/"><img src="{{ asset('assets/img/icons/MobileNegative.svg') }}" alt="Logo"></a></div>
           <div><img src="{{ asset('assets/img/icons/hamburger_a.png') }}" alt="hamburguerbtn"></div>
        </header>

        <main class="main">
            <h1 class="main__ttl">Pasajeros</h1>

            <div class="form">
                <div class="form__content">
                    <!-- Aqui se generan los formularios -->
                </div>
            </div>
        </main>

        <div class="footer__wrapper">
            <footer class="footer">
                <div class="footer__content">
                    <span>Precio final <svg height="20" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M4.45004 24.2251L16 12.6401L27.55 24.2251L30 21.7751L16 7.77511L2 21.7751L4.45004 24.2251Z" fill="currentColor"></path></svg></span>
                    <span>COP <span id="totalToPay">0</span></span>
                </div>

                <form action="{{ route('reserva') }}" method="POST">
                    @csrf
                    <input name="typeTravel" type="hidden" value="{{ $typeTravel }}">
                    <input id="currentPrice" name="currentPrice" type="hidden" value="{{ $currentPrice }}">
                    <input id="passengersTxt" name="arrayPassengers" type="hidden" value="{{ $arrayPassengers }}">
                    <input name="originCode" type="hidden" value="{{ $originCode }}">
                    <input name="originCity" type="hidden" value="{{ $originCity }}">
                    <input name="destinyCode" type="hidden" value="{{ $destinyCode }}">
                    <input name="destinyCity" type="hidden" value="{{ $destinyCity }}">
                    <input name="dateGoing" type="hidden" value="{{ $dateGoing }}">
                    <input name="dateLap" type="hidden" value="{{ $dateLap }}">
                    <!-- Horaios -->
                    <input name="originDepartureTime" type="hidden" value="{{ $originDepartureTime }}">
                    <input name="originArrivalTime" type="hidden" value="{{ $originArrivalTime }}">
                    <input name="destinyDepartureTime" type="hidden" value="{{ $destinyDepartureTime }}">
                    <input name="destinyArrivalTime" type="hidden" value="{{ $destinyArrivalTime }}">

                    <button id="btnContinue" class="footer__btn" disabled>Continuar</button>
                </form>
            </footer>
        </div>
    </div>

    <script src="{{asset('assets/js/passengers.js')}}"></script>
</body>
</html>