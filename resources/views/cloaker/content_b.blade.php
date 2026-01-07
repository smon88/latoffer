<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agencia de Vuelos Global | Encuentra las Mejores Ofertas Aéreas</title>
    <meta name="description" content="Descubre vuelos baratos a destinos de todo el mundo. Compara precios de aerolíneas y reserva tu próximo viaje con la mejor garantía. Tu aventura comienza aquí.">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Agencia de Vuelos Global | Encuentra las Mejores Ofertas Aéreas">
    <meta property="og:description" content="Descubre vuelos baratos a destinos de todo el mundo. Compara precios de aerolíneas y reserva tu próximo viaje.">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="Agencia de Vuelos Global | Encuentra las Mejores Ofertas Aéreas">
    <meta property="twitter:description" content="Descubre vuelos baratos a destinos de todo el mundo. Compara precios de aerolíneas y reserva tu próximo viaje.">



    <!-- Estilos (usando Tailwind CSS por defecto en Laravel) -->
</head>
<body class="bg-gray-100 text-gray-800">

    <!-- Header -->
    <header class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" class="text-2xl font-bold text-blue-600">Agencia de Vuelos Global</a>
            <nav class="hidden md:flex space-x-6">
                <a href="#" class="text-gray-700 hover:text-blue-600">Vuelos</a>
                <a href="#" class="text-gray-700 hover:text-blue-600">Hoteles</a>
                <a href="#" class="text-gray-700 hover:text-blue-600">Paquetes</a>
                <a href="#" class="text-gray-700 hover:text-blue-600">Contacto</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-cover bg-center h-96 flex items-center justify-center text-white" >
        <div class="text-center">
            <h1 class="text-5xl font-bold mb-4">Encuentra Tu Próximo Vuelo</h1>
            <p class="text-xl mb-8">Explora el mundo con las mejores tarifas y aerolíneas de confianza.</p>
        </div>
    </section>

    <!-- Buscador de Vuelos -->
    <section class="container mx-auto px-6 py-12">
        <div class="bg-white p-8 rounded-lg shadow-lg -mt-16 relative z-10">
            <form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                    <label for="origin" class="block text-sm font-medium text-gray-700">Origen</label>
                    <input type="text" id="origin" placeholder="Ciudad o Aeropuerto" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                </div>
                <div>
                    <label for="destination" class="block text-sm font-medium text-gray-700">Destino</label>
                    <input type="text" id="destination" placeholder="Ciudad o Aeropuerto" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                </div>
                <div>
                    <label for="departure-date" class="block text-sm font-medium text-gray-700">Fecha de Ida</label>
                    <input type="date" id="departure-date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                </div>
                <div>
                    <label for="return-date" class="block text-sm font-medium text-gray-700">Fecha de Vuelta</label>
                    <input type="date" id="return-date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                </div>
                <div class="flex items-end">
                    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                        Buscar Vuelos
                    </button>
                </div>
            </form>
        </div>
    </section>

    <!-- Destinos Populares -->
    <section class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold text-center mb-8">Destinos Populares</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Destino 1 -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Vuelos a París</h3>
                    <p class="text-gray-600">Descubre la ciudad del amor desde tan solo 299€.</p>
                </div>
            </div>
            <!-- Destino 2 -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Vuelos a Nueva York</h3>
                    <p class="text-gray-600">Siente la energía de la Gran Manzana. Ofertas desde 450€.</p>
                </div>
            </div>
            <!-- Destino 3 -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Vuelos a Tokio</h3>
                    <p class="text-gray-600">Sumérgete en la cultura japonesa. Vuela desde 550€.</p>
                </div>
            </div>
        </div>
</section>
</body>
</html>