let ingresos = {
    Quincena: 9000,
    Venta: 400
};

let egresos = {
    Renta: 900,
    Ropa: 400
};

const totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of Object.values(ingresos)) {
        totalIngreso += ingreso;
    }

    return totalIngreso;
};

const totalEgresos = () => {
    let totalEgreso = 0;

    for (let egreso of Object.values(egresos)) {
        totalEgreso += egreso;
    }

    return totalEgreso;
};

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    return [presupuesto, porcentajeEgreso];
};

const formatoMoneda = () => {
    const [presupuesto, porcentaje] = cargarCabecero();

    let presupuestoFormateado = presupuesto.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let porcentajeFormateado = porcentaje.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let totalIngresosFormateado = totalIngresos().toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let totalEgresosFormateado = totalEgresos().toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return {
        presupuesto: presupuestoFormateado,
        porcentaje: porcentajeFormateado,
        ingresos: totalIngresosFormateado,
        egresos: totalEgresosFormateado
    };
}

let resultado = formatoMoneda();
console.log(resultado);