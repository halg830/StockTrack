const helpersPresupuesto={
  validarPresupuesto: async(presupuesto, res) => {
    if(presupuesto<=0){
      throw new Error("El presupuesto debe ser mayor a 0")
    }
  }
}

export default helpersPresupuesto;