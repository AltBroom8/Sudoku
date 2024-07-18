const text = document.getElementsByClassName("numerito");

function validateInput(input) {
    // Limita la longitud a 1
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
    // Elimina cualquier valor fuera del rango 0-9
    if (input.value < 1 || input.value > 9) {
        input.value = '';
    }
}

// Añade el evento input a cada elemento con la clase numerito
for (const campo of text) {
    campo.addEventListener('input', function() {
        validateInput(campo);
    });
}