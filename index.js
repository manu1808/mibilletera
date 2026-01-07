const express = require('express');
const app = express();
const port = 3000;

// 1. CONFIGURACIÓN: Servir archivos de la carpeta 'public'
app.use(express.static('public'));
app.use(express.json()); // Permite a Express leer JSON que viene del cliente

let gastos = [
  { id: 1, concepto: 'Hamburguesa', monto: 10 },
  { id: 2, concepto: 'Cine', monto: 15 },
  { id: 3, concepto: 'Uber', monto: 5 }
];

// Nota: Ya no necesitamos la ruta app.get('/') porque index.html toma su lugar.

// Ruta para obtener los gastos (API)
app.get('/gastos', (req, res) => {
  res.json(gastos);
});

// NUEVA RUTA: Agregar un gasto (POST)
// Cuando alguien envíe datos a '/gastos', los guardamos
app.post('/gastos', (req, res) => {
  // req.body es la información que nos envía el navegador
  const nuevoGasto = req.body;
  
  // Le asignamos un ID simple (el largo de la lista + 1)
  nuevoGasto.id = gastos.length + 1;
  
  // Lo guardamos en nuestra lista en memoria
  gastos.push(nuevoGasto);
  
  // Respondemos confirmando que salió bien
  res.json({ mensaje: 'Gasto guardado con éxito', gasto: nuevoGasto });
});

// NUEVA RUTA: Borrar un gasto
// El ':id' funciona como una variable en la URL (ej: /gastos/1)
app.delete('/gastos/:id', (req, res) => {
  const idABorrar = parseInt(req.params.id); // Convertimos el texto a número
  
  // Aquí usamos "filter". Es como un colador.
  // Le decimos: "Quédate con todos los gastos MENOS el que tenga este ID".
  gastos = gastos.filter(gasto => gasto.id !== idABorrar);
  
  res.json({ mensaje: 'Gasto eliminado con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});