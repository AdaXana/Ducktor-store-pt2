const formulario = document.getElementById('form_duck');

formulario.addEventListener ("submit", function(event) {
    event.preventDefault(); 
    console.log("Mensaje enviado");

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const personalData = {
        name : name,
        phone : phone,
        email : email,
        message : message
    }
    console.log(personalData);

    const confirmMessage = document.getElementById("confirm_message");
    confirmMessage.textContent = "¡Gracias por contactarnos!";
})