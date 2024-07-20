const text = document.getElementsByClassName("numerito");
let matrix = []
function validateInput(input) {
    // Limita la longitud a 1
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
    // Elimina cualquier valor fuera del rango 1-9
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


function actualizaMatrix(){
    matrix = []
    const cuadrosMedium = document.querySelectorAll('.cuadro-mediano');
    
    let numInicial = 0;
    do{
        let numPeque = 0;
        for (let i = 0; i <= 2; i++ ){
            let fila = []
            for( let j = numInicial; j<= numInicial + 2; j++){
                
                for(let k = numPeque; k<= numPeque + 2; k ++){
                    const cuadrosPeque = cuadrosMedium[j].querySelectorAll('.cuadro-peque');
                    const miInput = cuadrosPeque[k].querySelector('.numerito');
                    let num = miInput.value;
                    if (num === ''){
                        num = 0
                    }
                    fila.push(num);
                }
                
            }
            matrix.push(fila)
            numPeque+=3;
        }
        numInicial+=3;
    }
    while(numInicial<9);

}

function setMatrix(){
    const cuadrosMedium = document.querySelectorAll('.cuadro-mediano');
    for( let i = 0; i<matrix.length; i++){
        for(let j=0; j< matrix[i].length; j++){
            let fila = Math.trunc(i / 3);
            let columna = Math.trunc(j / 3);
            console.log('fila: '+fila )
            let celda = (fila*3) + columna;

            let digito = (j%3) + ((i%3)*3);
            console.log('Celda es '+celda);
            console.log('digito es '+digito);
            const cuadrosPeque = cuadrosMedium[celda].querySelectorAll('.cuadro-peque');
            const miInput = cuadrosPeque[digito].querySelector('.numerito');
            miInput.value = matrix[i][j];
            


        }
    }
}

function clearMsg(){
    let mensajeExistente = document.querySelector('h3#mensaje-sudoku-no-valido');
    if (mensajeExistente) {
        mensajeExistente.remove();
      }
}

let solveBtn = document.getElementById('solver')
solveBtn.addEventListener('click', () => {
    clearMsg()
    console.log('Antes de actualizaMatrix');
    actualizaMatrix();
    console.log('Después de actualizaMatrix', matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let celda = matrix[i][j];
            if (!isNaN(celda)) {  
                matrix[i][j] = parseInt(celda);  
            }
        }
    }
    console.log('Matriz convertida a números:', matrix);

    
    try {
        console.log('Antes de llamar a solucion');
        matrix = solucion(matrix);
        console.log('Resultado de solucion:', matrix);
    } catch (error) {
        console.error('Error al llamar a solucion:', error);
        matrix = null;
    }

    if (matrix !== null) {
        console.log('Sudoku solucionado');
        setMatrix();
    } else {
        console.log('Sudoku no solucionable');
        
        let mensajeExistente = document.querySelector('h3#mensaje-sudoku-no-valido');
        if (!mensajeExistente) {
            var mensaje = document.createElement('h3');
            mensaje.id = 'mensaje-sudoku-no-valido';
            mensaje.textContent = 'You cannot solve this sudoku.';
            document.body.appendChild(mensaje);
        }
    }
    console.log('Fin del evento');
});

let clear = document.getElementById('clear');
clear.addEventListener('click',()=>{
    clearMsg();
    const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');

})