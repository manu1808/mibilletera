// Función para cargar los gastos (LEER)
async function cargarGastos() {
    const respuesta = await fetch('/gastos');
    const datos = await respuesta.json();
    
    const lista = document.getElementById('lista-gastos');
    lista.innerHTML = ''; 

    // Invertimos el orden para ver el más nuevo arriba
    datos.reverse().forEach(gasto => {
        const item = document.createElement('li');
        // OJO: Aquí usamos las comillas invertidas (backticks) ` `
        item.innerHTML = `
            <span>${gasto.concepto}</span>
            <div>
                <span class="precio">$${gasto.monto}</span>
                <button class="btn-borrar" onclick="eliminarGasto(${gasto.id})">Eliminar</button>
            </div>
        `;
        lista.appendChild(item);
    });
}

// Función para agregar gasto (CREAR)
async function agregarGasto() {
    const conceptoInput = document.getElementById('concepto');
    const montoInput = document.getElementById('monto');
    
    const nuevoGasto = {
        concepto: conceptoInput.value,
        monto: montoInput.value
    };

    await fetch('/gastos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoGasto)
    });

    conceptoInput.value = '';
    montoInput.value = '';
    cargarGastos();
}

// Función para eliminar (BORRAR)
async function eliminarGasto(id) {
    if(!confirm('¿Estás seguro de borrar este gasto?')) return;

    await fetch(`/gastos/${id}`, {
        method: 'DELETE'
    });

    cargarGastos();
}

// Cargar al inicio
cargarGastos();