const helpersFicha = {
    validarFechas: async (fechaInicio, req) => {
        const fechaActual = new Date();
        const fechaFin = req.req.body.fechaFin

        if (fechaInicio <= fechaActual) {
            throw new Error('La fecha de inicio debe ser mayor que la fecha actual');
        }
        if (fechaFin <= fechaInicio) {
            throw new Error('La fecha de fin debe ser mayor a la de inicio' );
        }
    }
}
export default helpersFicha