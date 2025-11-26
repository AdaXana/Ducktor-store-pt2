const formulario = document.getElementById('form_duck');

formulario.addEventListener ("submit", function(event) {
    event.preventDefault(); 
    console.log("Mensaje enviado");

    const message = document.getElementById("confirm_message");
    message.textContent = "¡Gracias por contactarnos!";
})