// Arreglos globales con instancias iniciales
const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500.00)
];

const egresos = [
    new Egreso('Renta departamento', 900.00),
    new Egreso('Ropa', 400.00)
];

// Función principal que inicializa los componentes de la aplicación
const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

// Cálculo de Totales
const totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

const totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

// Funciones de Formato
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits: 2
    });
};

// Renderizado de Cabecero
const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalIngresos() > 0 ? (totalEgresos() / totalIngresos()) : 0;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};

// Renderizado de Ingresos
const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
};

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    if (indiceEliminar !== -1) {
        ingresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarIngresos();
    }
};

// Renderizado de Egresos
const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
    let porcentaje = totalIngresos() > 0 ? (egreso.valor / totalIngresos()) : 0;
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
};

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    if (indiceEliminar !== -1) {
        egresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarEgresos();
    }
};

// Agregar nuevo Ingreso o Egreso
const agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'].value;
    let descripcion = forma['descripcion'].value;
    let valor = forma['valor'].value;

    if (descripcion.trim() !== '' && valor.trim() !== '' && !isNaN(valor) && Number(valor) > 0) {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, Number(valor)));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === 'egreso') {
            egresos.push(new Egreso(descripcion, Number(valor)));
            cargarCabecero();
            cargarEgresos();
        }
        // Limpiar campos del formulario
        forma['descripcion'].value = '';
        forma['valor'].value = '';
    }
};